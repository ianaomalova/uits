from django.contrib.auth import get_user_model
from django.db import models
from django.core.exceptions import ValidationError

User = get_user_model()


def color_validator(value: str):
    if not value.lower().startswith("#"):
        raise ValidationError(
            "%(value)s is not starting with #",
            params={"value": value},
        )


# Create your models here.
class UserEvent(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()

    started_at = models.DateTimeField()
    ended_at = models.DateTimeField()
    all_day = models.BooleanField(default=False)
    assigned_users = models.ManyToManyField(User, related_name='user_events')

    color = models.CharField(default="#000000", max_length=7, validators=[color_validator])

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='created_events')
