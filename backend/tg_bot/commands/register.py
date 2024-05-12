import telebot
from asgiref.sync import sync_to_async
from telebot.async_telebot import AsyncTeleBot
from django.contrib.auth import get_user_model

from tg_bot.base import BaseTelegramCommand
from tg_bot.models import TelegramUser

User = get_user_model()


class RegisterCommand(BaseTelegramCommand):

    def reply_already_exists(self):
        self.bot.reply_to(self.message, "Вы уже привязали свой аккаунт")

    def run(self):
        bot = self.bot
        message = self.message
        username = message.from_user.username
        chat_id = message.chat.id
        user_id = message.from_user.id

        if TelegramUser.objects.filter(user_id=user_id).count():
            self.reply_already_exists()
            return

        print(message.text)
        text = message.text
        splitted_text = text.split(' ')
        if len(splitted_text) < 2:
            print("Нет кода")
            bot.reply_to(message, "Вы не ввели код")
            return
        code = splitted_text[1].strip()
        print(code)

        try:
            user = User.objects.get(telegram_code=code)
        except User.DoesNotExist:
            print('Пользователя не существует')
            bot.reply_to(message, f"Ошибка. Такого пользователя с кодом '{code}' нет")
            return
        print(user)
        try:
            print('ыыы')
            tg_user = user.telegram_user
            print('тут?')
            self.reply_already_exists()
        except User.telegram_user.RelatedObjectDoesNotExist:
            print('тут? 2')
            tg_user = TelegramUser.objects.create(chat_id=chat_id, user_id=user_id, username=username,
                                                  assigned_user=user)
            print('tyt')
            bot.reply_to(message, """
Отлично! Вы зарегистрированы. Теперь в этот чат будут приходить уведомления с сайта УИТС. Чтобы перестать получать уведомления введите /cancel
                """)
