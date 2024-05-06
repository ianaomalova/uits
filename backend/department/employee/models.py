from django.core.files.uploadedfile import InMemoryUploadedFile
from django.db import models
from imagekit.models import ProcessedImageField
from imagekit.processors import ResizeToFit
from department.employee.schedule.models import Schedule


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
        return (self.first_name or '') + " " + (self.last_name or '') + " " + (self.patronymic or '')

    def import_schedule(self, file: InMemoryUploadedFile):
        Schedule.objects.import_from_file(self.id, file)

    class Meta:
        verbose_name = 'преподаватель'
        verbose_name_plural = 'преподаватели'


class HelpersEmployee(models.Model):
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
    position = models.CharField(max_length=100)

    def __str__(self):
        return (self.first_name or '') + " " + (self.last_name or '') + " " + (self.patronymic or '')

    class Meta:
        verbose_name = 'персонал'
        verbose_name_plural = 'учебно-вспомогательный персонал'
