import django_filters
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_jwt.authentication import JSONWebTokenAuthentication

from lms.models import Course, Lesson
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

    queryset = Lesson.objects.all()
    serializer_class = LessonFullSerializer
    lookup_url_kwarg = 'id'
