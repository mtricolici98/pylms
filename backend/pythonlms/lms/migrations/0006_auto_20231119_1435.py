# Generated by Django 3.2.22 on 2023-11-19 14:35

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('lms', '0005_homeworksubmission'),
    ]

    operations = [
        migrations.RenameField(
            model_name='homework',
            old_name='content',
            new_name='introduction',
        ),
        migrations.RemoveField(
            model_name='homework',
            name='attachments',
        ),
        migrations.RemoveField(
            model_name='homework',
            name='enabled',
        ),
        migrations.RemoveField(
            model_name='homework',
            name='link',
        ),
        migrations.AddField(
            model_name='homework',
            name='available_from',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
        migrations.AddField(
            model_name='homeworktask',
            name='attachments',
            field=models.FileField(null=True, upload_to=''),
        ),
        migrations.AddField(
            model_name='homeworktask',
            name='link',
            field=models.URLField(null=True),
        ),
        migrations.AlterField(
            model_name='lesson',
            name='homework',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, to='lms.homework'),
        ),
    ]
