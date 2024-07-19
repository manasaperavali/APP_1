import datetime
from django.core.management.base import BaseCommand
from todo.models import Task

class Command(BaseCommand):
    help = 'Check tasks and send reminders'

    def handle(self, *args, **kwargs):
        today = datetime.date.today()
        tasks = Task.objects.filter(due_date=today, reminder_set=False)
        for task in tasks:
            self.send_reminder(task)
            task.reminder_set = True
            task.save()

    def send_reminder(self, task):
        # Here you can integrate with an email service or notification service
        print(f'Reminder: Task "{task.title}" is due today.')
