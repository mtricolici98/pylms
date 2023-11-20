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
    lessons = serializers.SerializerMethodField()

    class Meta:
        model = Course
        fields = ['id', 'title', 'description', 'image', 'lessons']

    @staticmethod
    def get_lessons(obj: Course):
        return LessonMinSerializer(obj.lesson_set.all(), many=True).data


class HomeworkTaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = HomeworkTask
        fields = ['id', 'task_name', 'task_text', 'attachments', 'link']


class HomeWorkSerializer(serializers.ModelSerializer):
    homework_tasks = serializers.SerializerMethodField()
    enabled = serializers.ReadOnlyField()

    @staticmethod
    def get_homework_tasks(obj: HomeWork):
        return HomeworkTaskSerializer(obj.homework_tasks.all(), many=True).data

    class Meta:
        model = HomeWork
        fields = ['id', 'introduction', 'homework_tasks', 'enabled']


class LessonFullSerializer(serializers.ModelSerializer):
    course = CourseMinSerializer()

    homework = HomeWorkSerializer()

    class Meta:
        model = Lesson
        fields = ['id', 'title', 'course', 'available_from', 'content', 'homework']
