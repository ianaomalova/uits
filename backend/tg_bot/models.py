from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model()


# Create your models here.
class TelegramUser(models.Model):
    user_id = models.IntegerField()
    username = models.CharField(max_length=255)
    chat_id = models.IntegerField()
    assigned_user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='telegram_user')
