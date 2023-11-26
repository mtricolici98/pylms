from django.contrib import admin

from lms.models import Course, HomeworkTask, HomeWork, Lesson, CheatSheetElement, HomeworkSubmission


# Register your models here.
class CourseAdmin(admin.ModelAdmin):
    pass


class LessonAdmin(admin.ModelAdmin):
    pass


class HomeworkTaskAdmin(admin.ModelAdmin):
    pass


class CheatSheetElementAdmin(admin.ModelAdmin):
    pass

class HomeworkSubmissionAdmin(admin.ModelAdmin):
    pass


class HomeworkTaskInline(admin.StackedInline):
    model = HomeWork.homework_tasks.through


class HomeworkAdmin(admin.ModelAdmin):
    inlines = [
        HomeworkTaskInline
    ]


admin.site.register(Course, CourseAdmin)
admin.site.register(Lesson, LessonAdmin)
admin.site.register(HomeWork, HomeworkAdmin)
admin.site.register(HomeworkTask, HomeworkTaskAdmin)
admin.site.register(CheatSheetElement, CheatSheetElementAdmin)
admin.site.register(HomeworkSubmission, HomeworkSubmissionAdmin)
