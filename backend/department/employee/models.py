from django.core.files.uploadedfile import InMemoryUploadedFile
from django.db import models
from imagekit.models import ProcessedImageField
from imagekit.processors import ResizeToFit

from .schedule.import_schedule import parse_schedule


# Create your models here.
class Teacher(models.Model):
    avatar = ProcessedImageField(upload_to='avatars/%Y/%m/%d',
                                 default=None,
                                 blank=True,
                                 format='JPEG',
                                 processors=[ResizeToFit(512)],
                                 options={'quality': 80},
                                 null=True)
    # Основная информация
    last_name = models.CharField(max_length=50)
    first_name = models.CharField(max_length=50)
    patronymic = models.CharField(max_length=50, blank=True, null=True)

    # Степень, звание, должность
    degree = models.CharField(max_length=100, blank=True, null=True)
    rank = models.CharField(max_length=100, blank=True, null=True)
    position = models.CharField(max_length=100)

    # Общая информация
    bio = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.first_name + " " + self.last_name + " " + self.patronymic

    def import_schedule(self, file: InMemoryUploadedFile):
        data = parse_schedule(file)
