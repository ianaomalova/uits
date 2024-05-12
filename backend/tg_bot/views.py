import asyncio
import threading

import telebot
from asgiref.sync import async_to_sync
from django.contrib.auth import get_user_model
from django.http import JsonResponse, HttpResponseForbidden
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
from rest_framework import permissions
from telebot.types import Update
from rest_framework.exceptions import PermissionDenied

from tg_bot.client import bot
from rest_framework.generics import DestroyAPIView

from tg_bot.models import TelegramUser
from tg_bot.serializers import TelegramUserSerializer

User = get_user_model()


def async_process_updates(update):
    try:
        loop = asyncio.get_event_loop()
    except RuntimeError:
        print("Создаём новый event loop")
        loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    asyncio.run(bot.process_new_updates([update]))


def telegram_webhook_service(update: Update):
    # thread = threading.Thread(target=async_process_updates, args=(update,))
    # thread.start()
    bot.process_new_updates([update])


# Create your views here.
@csrf_exempt
def telegram_webhook(request):
    if request.method == 'POST':
        secret_token = request.headers.get('X-Telegram-Bot-Api-Secret-Token', None)
        if secret_token != settings.TELEGRAM_BOT.get('WEBHOOK_SECRET'):
            return HttpResponseForbidden()
        update_json_string = request.body.decode('utf-8')
        update = telebot.types.Update.de_json(update_json_string)
        threading.Thread(target=telegram_webhook_service, args=(update,)).start()
        print('Поток обработки обновления бота запущен')
        return JsonResponse({"status": "ok"})
    return JsonResponse({'status': 'error'})


class TelegramUserAPIView(DestroyAPIView):
    queryset = TelegramUser.objects.all()
    serializer_class = TelegramUserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_destroy(self, instance):
        user = self.request.user
        if user.id != instance.assigned_user_id:
            raise PermissionDenied()
        instance.delete()
