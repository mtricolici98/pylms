# Generated by Django 3.2.22 on 2023-11-06 18:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('lms', '0002_alter_lesson_available_from'),
    ]

    operations = [
        migrations.AlterField(
            model_name='lesson',
            name='title',
            field=models.CharField(max_length=255),
        ),
    ]