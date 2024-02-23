from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    is_moderator = models.BooleanField(default=False)

    def __str__(self):
        if self.first_name and self.last_name:
            return self.first_name + ' ' + self.last_name
        else:
            return self.username
