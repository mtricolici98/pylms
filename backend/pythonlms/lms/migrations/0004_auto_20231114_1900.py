# Generated by Django 3.2.22 on 2023-11-14 19:00

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('lms', '0003_alter_lesson_title'),
    ]

    operations = [
        migrations.AddField(
            model_name='homework',
            name='enabled',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='lesson',
            name='available_from',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
    ]
