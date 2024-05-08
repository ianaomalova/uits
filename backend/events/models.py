from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model()


# Create your models here.
class UserEvent(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()

    started_at = models.DateTimeField()
    ended_at = models.DateTimeField()
    all_day = models.BooleanField(default=False)
    assigned_users = models.ManyToManyField(User, related_name='user_events')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='created_events')
