from django.urls import path

from tg_bot.views import telegram_webhook, TelegramUserDestroyAPIView, UserEventsNotificationsAPIView

urlpatterns = [
    path('webhook', telegram_webhook, name='telegram_webhook'),
    path('user/<int:pk>', TelegramUserDestroyAPIView.as_view(), name='delete_telegram_user'),
    path('events', UserEventsNotificationsAPIView.as_view(), name='notify_user_events'),
]
