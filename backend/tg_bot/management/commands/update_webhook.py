
from django.core.management import BaseCommand

from django.conf import settings
from tg_bot.client import bot


class Command(BaseCommand):
    help = "Устанавливает телеграм боту url вебхука"

    def handle(self, *args, **options):
        bot.set_webhook(settings.TELEGRAM_BOT.get('WEBHOOK_URL'),
                        secret_token=settings.TELEGRAM_BOT.get('WEBHOOK_SECRET'))
        self.stdout.write(
            self.style.SUCCESS('Webhook установлен')
        )
