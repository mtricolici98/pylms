# Generated by Django 3.2.22 on 2023-11-26 16:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('lms', '0010_homeworksubmission_comment'),
    ]

    operations = [
        migrations.CreateModel(
            name='CheatSheetElement',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('order', models.IntegerField(default=0)),
                ('code', models.TextField()),
                ('title', models.CharField(max_length=255)),
            ],
        ),
    ]
