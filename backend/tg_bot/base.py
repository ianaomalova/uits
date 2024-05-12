import abc

import telebot


class BaseTelegramCommand(abc.ABC):
    def __init__(self, bot: telebot.TeleBot, message: telebot.types.Message):
        self.bot = bot
        self.message = message

    @abc.abstractmethod
    def run(self):
        pass
