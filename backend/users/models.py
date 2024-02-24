from django.contrib.auth.models import AbstractUser
from django.db import models
from imagekit.models import ProcessedImageField
from imagekit.processors import ResizeToFit

class User(AbstractUser):
    avatar = ProcessedImageField(
        verbose_name="Аватар пользователя",
        upload_to="photos/avatars/%Y/%m/%d",
        processors=[ResizeToFit(512)],
        format='JPEG',
        options={'quality': 90},
        null=True,
        blank=True,
        default=True
    )
    is_moderator = models.BooleanField(default=False)

    def __str__(self):
        if self.first_name and self.last_name:
            return self.first_name + ' ' + self.last_name
        else:
            return self.username
