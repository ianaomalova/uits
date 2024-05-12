import telebot
from telebot.async_telebot import AsyncTeleBot
from django.conf import settings

from tg_bot.commands import StartCommand, RegisterCommand, CancelCommand

bot = telebot.TeleBot(settings.TELEGRAM_BOT.get('TOKEN'), )


@bot.message_handler(commands=['start'])
def start(message: telebot.types.Message):
    StartCommand(bot, message).run()


@bot.message_handler(commands=['register'])
def register(message: telebot.types.Message, ):
    RegisterCommand(bot, message).run()


@bot.message_handler(commands=['cancel'])
def cancel(message: telebot.types.Message, ):
    CancelCommand(bot, message).run()
