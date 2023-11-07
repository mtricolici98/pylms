from datetime import datetime

from django.db import models
from django.utils import timezone


class Course(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=25, null=False)
    description = models.TextField(null=False, default='')
    image = models.ImageField()

    def __repr__(self):
        return f"[{self.id}] | {self.title} | {self.description[:20]} {'...' if len(self.description) > 20 else ''} | {'with image' if self.image else 'no image'}"

    def __str__(self):
        return repr(self)


class HomeworkTask(models.Model):
    id = models.AutoField(primary_key=True)
    task_name = models.CharField(max_length=30)
    task_text = models.TextField(null=False, default='')


class HomeWork(models.Model):
    id = models.AutoField(primary_key=True)
    content = models.TextField(null=False, default='')
    attachments = models.FileField(null=True)
    link = models.URLField(null=True)
    homework_tasks = models.ManyToManyField(HomeworkTask)


class Lesson(models.Model):
    id = models.AutoField(primary_key=True)
    order = models.IntegerField(default=1, null=False)
    title = models.CharField(max_length=255)
    course = models.ForeignKey(Course, on_delete=models.PROTECT, null=False)
    available_from = models.DateTimeField(default=timezone.now)
    content = models.TextField()
    homework = models.ForeignKey(HomeWork, on_delete=models.PROTECT)

    class Meta:
        unique_together = ['title', 'course']
