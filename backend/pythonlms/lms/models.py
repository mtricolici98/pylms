from datetime import datetime

from django.db import models
from django.utils import timezone

from users.models import User


class Course(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=25, null=False)
    description = models.TextField(null=False, default='')
    image = models.ImageField()

    def __repr__(self):
        return (f"[{self.id}] | {self.title} | {self.description[:20]} {'...' if len(self.description) > 20 else ''} "
                f"| {'with image' if self.image else 'no image'}")

    def __str__(self):
        return repr(self)


class HomeworkTask(models.Model):
    id = models.AutoField(primary_key=True)
    task_name = models.CharField(max_length=30)
    task_text = models.TextField(null=False, default='')
    attachments = models.FileField(null=True)
    link = models.URLField(null=True)

    def __repr__(self):
        return (f"[{self.id}] | {self.task_name} |"
                f" {self.task_text[:20]} {'...' if len(self.task_text) > 20 else ''}")

    def __str__(self):
        return repr(self)


class HomeworkSubmission(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, null=False, on_delete=models.PROTECT)
    homework = models.ForeignKey(HomeworkTask, null=False, on_delete=models.PROTECT)
    code = models.TextField()
    attachment = models.FileField()

    def __repr__(self):
        return (f"Submission | {self.user.get_username()} | task {self.homework.task_name} |"
                f" {'with attachement' if self.attachment else 'no attachement'}")

    def __str__(self):
        return repr(self)


class HomeWork(models.Model):
    id = models.AutoField(primary_key=True)
    introduction = models.TextField(null=False, default='')
    homework_tasks = models.ManyToManyField(HomeworkTask)
    available_from = models.DateTimeField(default=timezone.now)

    def __repr__(self):
        return (f"[{self.id}] | {self.homework_tasks.count()} tasks |"
                f" {self.introduction[:20]} {'...' if len(self.introduction) > 20 else ''}")

    def __str__(self):
        return repr(self)

    @property
    def enabled(self):
        return timezone.now() > self.available_from


class Lesson(models.Model):
    id = models.AutoField(primary_key=True)
    order = models.IntegerField(default=1, null=False)
    title = models.CharField(max_length=255)
    course = models.ForeignKey(Course, on_delete=models.PROTECT, null=False)
    available_from = models.DateTimeField(default=timezone.now)
    summary = models.TextField(null=False, default='')
    content = models.TextField()
    homework = models.ForeignKey(HomeWork, on_delete=models.PROTECT, null=True)

    class Meta:
        unique_together = ['title', 'course']

    def __repr__(self):
        return (f"[{self.id}] | {self.title} | {self.content[:20]} {'...' if len(self.content) > 20 else ''} "
                f"| {'with homework' if self.homework else 'no homework'}")

    def __str__(self):
        return repr(self)
