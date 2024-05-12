from django.urls import path

from tg_bot.views import telegram_webhook, TelegramUserAPIView

urlpatterns = [
    path('webhook', telegram_webhook, name='telegram_webhook'),
    path('user/<int:pk>', TelegramUserAPIView.as_view(), name='delete_telegram_user'),
]
