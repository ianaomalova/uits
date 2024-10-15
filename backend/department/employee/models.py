# department/employee/models.py

from django.core.files.uploadedfile import InMemoryUploadedFile
from django.db import models, connection
from imagekit.models import ProcessedImageField
from imagekit.processors import ResizeToFit

from department.employee.schedule.models import Schedule

class Teacher(models.Model):
    class TeacherRank(models.TextChoices):
        READER = "READER", "Доцент",
        PROFESSOR = "PROFESSOR", "Профессор",

    class TeacherDegree(models.TextChoices):
        DOCTOR_TECH = "DOCTOR_TECH", "Доктор технических наук"
        CANDIDATE_TECH = "CANDIDATE_TECH", "Кандидат технических наук"
        CANDIDATE_PED = "CANDIDATE_PED", "Кандидат педагогических наук"
        DOCTOR_PHYS_MATH = "DOCTOR_PHYS_MATH", "Доктор физико-математических наук"
        CANDIDATE_PHYS_MATH = "CANDIDATE_PHYS_MATH", "Кандидат физико-математических наук"
        DOCTOR_ECONOM = "DOCTOR_ECONOM", "Доктор экономических наук"
        CANDIDATE_ECONOM = "CANDIDATE_ECONOM", "Кандидат экономических наук"

    avatar = ProcessedImageField(upload_to='avatars/%Y/%m/%d',
                                 default=None,
                                 blank=True,
                                 format='JPEG',
                                 processors=[ResizeToFit(512)],
                                 options={'quality': 80},
                                 null=True)
    # Основная информация
    last_name = models.CharField(max_length=50, verbose_name="Фамилия")
    first_name = models.CharField(max_length=50, verbose_name="Имя")
    patronymic = models.CharField(max_length=50, blank=True, null=True, verbose_name="Отчество")

    # Тестовая инфа(удалить)
    user_id = models.BigIntegerField(null=True, blank=True)

    # Степень, звание, должность
    degree = models.CharField(max_length=100, choices=TeacherDegree.choices, blank=True, null=True,
                              verbose_name="Степень")
    rank = models.CharField(max_length=100, choices=TeacherRank.choices, blank=True, null=True, verbose_name="Звание")
    position = models.CharField(max_length=100, verbose_name="Должность")

    # Общая информация
    bio = models.TextField(blank=True, null=True, verbose_name="Биография")

    def __str__(self):
        return self.full_name

    def import_schedule(self, file: InMemoryUploadedFile):
        Schedule.objects.import_from_file(self.id, file)

    @property
    def short_name(self):
        initial_first_name = self.first_name[0] + '.' if self.first_name and len(self.first_name) != 0 else ''
        initial_patronymic = self.patronymic[0] + '.' if self.patronymic and len(self.patronymic) != 0 else ''
        return self.last_name + ' ' + initial_first_name + ' ' + initial_patronymic

    @property
    def full_name(self):
        return self.last_name + ' ' + (self.first_name if self.first_name else '') + ' ' + (self.patronymic if self.patronymic else '')

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
