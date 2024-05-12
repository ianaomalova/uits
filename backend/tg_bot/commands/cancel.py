import telebot
from telebot.async_telebot import AsyncTeleBot

from tg_bot.base import BaseTelegramCommand
from tg_bot.models import TelegramUser


class CancelCommand(BaseTelegramCommand):
    def run(self):
        try:
            tg_user = TelegramUser.objects.get(user_id=self.message.from_user.id)
            tg_user.delete()
            self.bot.reply_to(self.message, "Вы успешно отписались от уведомлений")
        except TelegramUser.DoesNotExist:
            self.bot.reply_to(self.message, "Вы уже отписаны от уведомлений")
