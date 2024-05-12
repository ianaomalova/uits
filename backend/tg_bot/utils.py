import string
import random


def generate_telegram_code():
    return ''.join(random.choices(string.ascii_letters + string.digits, k=12))
