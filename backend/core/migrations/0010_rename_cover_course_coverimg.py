# Generated by Django 4.2.1 on 2023-05-22 05:11

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0009_rename_image_course_cover'),
    ]

    operations = [
        migrations.RenameField(
            model_name='course',
            old_name='cover',
            new_name='coverImg',
        ),
    ]
