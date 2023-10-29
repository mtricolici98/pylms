from django.urls import path
from lms.views import CoursesListView, CourseGetView, LessonListView, LessonGet

urlpatterns = [
    path("course/list/", CoursesListView.as_view()),
    path("course/get/<id>/", CourseGetView.as_view()),
    path("lesson/list/", LessonListView.as_view()),
    path("lesson/get/<id>/", LessonGet.as_view()),
]
