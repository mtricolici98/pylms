from django.urls import path
from lms.views import CoursesListView, CourseGetView, LessonListView, LessonGet, register_lesson_visit, \
    user_last_lesson, get_submitted_homeworks, submit_homework, get_user_submitted_homeworks

urlpatterns = [
    path("course/list/", CoursesListView.as_view()),
    path("course/get/<id>/", CourseGetView.as_view()),
    path("lesson/list/", LessonListView.as_view()),
    path("lesson/get/<id>/", LessonGet.as_view()),
    path("lesson/visited/last/", user_last_lesson),
    path("lesson/visited/<lesson_id>/", register_lesson_visit),
    path("lesson/homework/get/<lesson_id>/", get_submitted_homeworks),
    path("lesson/homework/submissions/", get_user_submitted_homeworks),
    path("lesson/homework/submit/", submit_homework),
]
