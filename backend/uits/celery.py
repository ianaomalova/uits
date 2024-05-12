import os

from celery import Celery
from django.conf import settings

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'uits.settings')

app = Celery('uits')


# namespace='CELERY' means all celery-related configuration keys
# should be uppercased and have a `CELERY_` prefix in Django settings.
# https://docs.celeryproject.org/en/stable/userguide/configuration.html
app.config_from_object('django.conf:settings', namespace="CELERY")

# When we use the following in Django, it loads all the <appname>.tasks
# files and registers any tasks it finds in them. We can import the
# tasks files some other way if we prefer.
app.autodiscover_tasks(lambda: settings.LOCAL_INSTALLED_APPS)
# app.conf.task_routes = ([
#     ('events.tasks.*', {'queue': 'events_tasks_queue'}),
# ])
#
# app.conf.task_default_queue = 'events_tasks_queue'
