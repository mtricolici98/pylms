import os

import django_filters
from django.utils import timezone
from rest_framework import generics
from rest_framework.decorators import api_view, authentication_classes, parser_classes, permission_classes
from rest_framework.parsers import FormParser, MultiPartParser, JSONParser
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from rest_framework.response import Response
from rest_framework_jwt.authentication import JSONWebTokenAuthentication

from lms.models import Course, Lesson, HomeworkSubmission, LessonVisit, CheatSheetElement
from lms.serializers import CourseSerializer, CourseMinSerializer, LessonMinSerializer, LessonFullSerializer


# Create your views here.


class CoursesListView(generics.ListAPIView):
    permission_classes = (AllowAny,)
    queryset = Course.objects.all()
    serializer_class = CourseMinSerializer
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend]


class CourseGetView(generics.RetrieveAPIView):
    permission_classes = (IsAuthenticated,)
    authentication_class = JSONWebTokenAuthentication

    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    lookup_url_kwarg = 'id'


class LessonListView(generics.ListAPIView):
    permission_classes = (IsAuthenticated,)
    authentication_class = JSONWebTokenAuthentication

    queryset = Lesson.objects.all().order_by('order')
    serializer_class = LessonMinSerializer
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend]


class LessonGet(generics.RetrieveAPIView):
    permission_classes = (IsAuthenticated,)
    authentication_class = JSONWebTokenAuthentication

    queryset = Lesson.objects.filter(available_from__lte=timezone.now())
    serializer_class = LessonFullSerializer
    lookup_url_kwarg = 'id'


@api_view(['GET'])
@authentication_classes([JSONWebTokenAuthentication])
def get_submitted_homeworks(request, lesson_id):
    data = []
    for hs in HomeworkSubmission.objects.filter(
            homework__homework__lesson__id=lesson_id,
            user=request.user
    ):
        data.append(
            {
                'task_id': hs.homework_id,
                'code': hs.code,
                'attachment': dict(
                    name=os.path.split(hs.attachment.name)[-1],
                    url=hs.attachment.url
                ) if hs.attachment else None,
                'approved': hs.approved,
                'comment': hs.comment,
            }
        )
    return Response(status=200, data=data)


@api_view(['GET'])
@authentication_classes([JSONWebTokenAuthentication])
def get_user_submitted_homeworks(request):
    data = []
    for hs in HomeworkSubmission.objects.filter(
            user=request.user
    ):
        data.append(
            {
                'task_name': hs.homework.task_name,
            }
        )
    return Response(status=200, data=data)


@api_view(['GET'])
@authentication_classes([JSONWebTokenAuthentication])
@permission_classes([IsAdminUser])
def get_task_submissions(request, task_id):
    data = []
    for hs in HomeworkSubmission.objects.filter(
            homework_id=task_id
    ):
        data.append(
            {
                'id': hs.id,
                'code': hs.code,
                'comment': hs.comment,
                'user': dict(name=hs.user.username, email=hs.user.email),
                'approved': hs.approved,
                'attachment': dict(
                    name=os.path.split(hs.attachment.name)[-1],
                    url=hs.attachment.url
                ) if hs.attachment else None,
            }
        )
    return Response(status=200, data=data)


@api_view(['POST'])
@parser_classes([FormParser, MultiPartParser, JSONParser])
@authentication_classes([JSONWebTokenAuthentication])
@permission_classes([IsAdminUser])
def modify_submission(request, submission_id):
    approved = request.data.get('approval', None)
    comment = request.data.get('comment', "")
    records = HomeworkSubmission.objects.filter(id=submission_id).update(
        approved=approved,
        comment=comment
    )
    return Response(status=200 if records else 404)


@api_view(['POST'])
@parser_classes([FormParser, MultiPartParser, JSONParser])
@authentication_classes([JSONWebTokenAuthentication])
def submit_homework(request):
    task_id = request.data.get('task_id')
    if not task_id:
        return Response(
            status=400
        )
    code = request.data.get('code', '')
    files = request.FILES.get('file')
    el, _ = HomeworkSubmission.objects.update_or_create(
        homework_id=task_id,
        user=request.user,
        defaults=dict(
            code=code,
            attachment=files,
            approved=None,
        )
    )
    return Response(status=200, data=dict(
        {
            'task_id': el.homework_id,
            'code': el.code,
            'attachment': dict(
                name=os.path.split(el.attachment.name)[-1],
                url=el.attachment.url
            ) if el.attachment else None,
            'approved': el.approved,
            'comment': el.comment,
        }
    ))


@api_view(['POST'])
@authentication_classes([JSONWebTokenAuthentication])
def register_lesson_visit(request, lesson_id):
    user = request.user
    LessonVisit.objects.update_or_create(
        lesson_id=lesson_id,
        user=user,
        defaults=dict(
            date=timezone.now()
        )
    )
    return Response(status=200)


@api_view(['GET'])
@authentication_classes([JSONWebTokenAuthentication])
def user_last_lesson(request):
    user = request.user
    last_visit = LessonVisit.objects.filter(
        user=user
    ).order_by('-date').first()
    return Response(status=200, data=dict(lesson_id=last_visit.lesson_id if last_visit else None))


@api_view(['GET'])
@authentication_classes([JSONWebTokenAuthentication])
def cheatsheet_elements(request):
    data = list(CheatSheetElement.objects.all().order_by('order').values(
        'code', 'title'
    ))
    return Response(status=200, data=data)
