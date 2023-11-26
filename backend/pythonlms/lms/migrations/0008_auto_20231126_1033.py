# Generated by Django 3.2.22 on 2023-11-26 10:33

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('lms', '0007_lesson_summary'),
    ]

    operations = [
        migrations.AlterField(
            model_name='homeworksubmission',
            name='attachment',
            field=models.FileField(upload_to='homework_sub'),
        ),
        migrations.CreateModel(
            name='LessonVisit',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('date', models.DateTimeField(default=django.utils.timezone.now)),
                ('lesson', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='lms.lesson')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'unique_together': {('lesson', 'user')},
            },
        ),
    ]