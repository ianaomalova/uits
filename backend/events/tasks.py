from datetime import datetime

import pytz
from celery import shared_task
from celery.utils.log import get_task_logger
from .models import UserEvent

logger = get_task_logger(__name__)


@shared_task
def schedule_notify_bot():
    logger.info('USER EVENTS START CHECK')
    now = datetime.now().astimezone(pytz.timezone('Europe/Moscow'))
    for event in UserEvent.objects.filter(start_notified=False, started_at__lt=now.isoformat()):
        event.notify("Уведомление о начале события")
        event.start_notified = True
        event.save()
