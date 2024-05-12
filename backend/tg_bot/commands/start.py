import telebot
from tg_bot.base import BaseTelegramCommand


class StartCommand(BaseTelegramCommand):
    def run(self):
        print('ВЫЗВАНА КОМАНДА /start')

        self.bot.reply_to(self.message, f'Привет! {self.message.from_user.username}\n'
                                          f'Я бот, который будет уведомлять вас о предстоящих событиях'
                                          """
Если вы согласны, чтобы сохранил данные вашего профиля Telegram в базе данных, а именно ваш username и chat_id, то вызовите команду /register и введите выданный вам код из 12 символов. 
Пример /register AAAbbbCCC333
                                          """)
        print('Сообщение отправлено')
