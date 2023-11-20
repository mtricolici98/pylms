# Generated by Django 3.2.22 on 2023-11-14 19:06

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('lms', '0004_auto_20231114_1900'),
    ]

    operations = [
        migrations.CreateModel(
            name='HomeworkSubmission',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('code', models.TextField()),
                ('attachment', models.FileField(upload_to='')),
                ('homework', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='lms.homeworktask')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]