# Generated by Django 4.2 on 2023-05-01 19:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0004_alter_student_phone'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='isAuthor',
            field=models.BooleanField(default=False),
        ),
    ]
