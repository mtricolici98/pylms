from rest_framework import serializers

from lms.models import Course, Lesson, HomeWork, HomeworkTask


class CourseMinSerializer(serializers.ModelSerializer):
    lesson_count = serializers.SerializerMethodField()

    def get_lesson_count(self, obj: Course):
        return obj.lesson_set.count()

    class Meta:
        model = Course
        fields = ['id', 'title', 'description', 'image', 'lesson_count']


class LessonMinSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        fields = ['id', 'title', 'course', 'available_from']


class CourseSerializer(CourseMinSerializer):
    lessons = LessonMinSerializer(many=True)

    class Meta:
        model = Course
        fields = ['id', 'title', 'description', 'image', 'lessons']


class HomeworkTaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = HomeworkTask
        fields = ['id', 'task_name', 'task_text']


class HomeWorkSerializer(serializers.ModelSerializer):
    homework_tasks = HomeworkTaskSerializer(many=True)

    class Meta:
        model = HomeWork
        fields = ['id', 'content', 'attachments', 'link', 'homework_tasks']


class LessonFullSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        fields = ['id', 'title', 'course', 'available_from', 'content']
