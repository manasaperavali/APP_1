# Generated by Django 4.1 on 2024-07-16 18:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todo', '0002_task_category_task_priority_task_tags'),
    ]

    operations = [
        migrations.AddField(
            model_name='task',
            name='reminder_set',
            field=models.BooleanField(default=False),
        ),
    ]