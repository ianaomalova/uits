import re
from datetime import datetime
from typing import List

from django.db import models

from department.employee.schedule.managers import ScheduleManager

from django.core.exceptions import ValidationError


def validate_lesson_date_format(value):
    pattern = re.compile(r'^\d{2}\.\d{2}$')
    if not pattern.match(value):
        raise ValidationError('Дата должна быть в формате DD.MM')

    day, month = map(int, value.split('.'))

    # Проверка допустимых диапазонов для дней и месяцев
    if not (1 <= month <= 12):
        raise ValidationError('Месяц должен быть в диапазоне от 1 до 12')

    try:
        now = datetime.now()
        # Проверка корректности даты
        datetime(now.year, month, day)  # Используем 2000 год, так как это високосный год
    except ValueError:
        raise ValidationError('Некорректная дата для данного месяца')


class Schedule(models.Model):
    teacher = models.OneToOneField('employee.teacher', on_delete=models.CASCADE, related_name='schedule',
                                   verbose_name="Преподаватель")
    imported_file_name = models.CharField(max_length=256, editable=False, blank=True, null=True,
                                          verbose_name="Название импортированного файла", default="-")
    objects = ScheduleManager()

    def __str__(self):
        return self.teacher.short_name

    class Meta:
        verbose_name = "Расписание"
        verbose_name_plural = "Расписания"


class ScheduleLesson(models.Model):
    class ScheduleWeekNumber(models.IntegerChoices):
        MONDAY = 1, "Понедельник"
        TUESDAY = 2, "Вторник"
        WEDNESDAY = 3, "Среда"
        THURSDAY = 4, "Четверг"
        FRIDAY = 5, "Пятница"
        SATURDAY = 6, "Суббота"

    class ClassTime(models.IntegerChoices):
        FIRST = 1, "8:30 - 10:10"
        SECOND = 2, "10:20 - 12:00"
        THIRD = 3, "12:20 - 14:00"
        FOURTH = 4, "14:10 - 15:50"
        FIFTH = 5, "16:00 - 17:40"
        SIXTH = 6, "18:00 - 19:30"
        SEVENTH = 7, "19:40 - 21:10"
        EIGHTH = 8, "21:20 - 22:50"

    class_time = models.IntegerField(choices=ClassTime.choices, verbose_name="Время пары")
    week_number = models.IntegerField(choices=ScheduleWeekNumber.choices, verbose_name="День недели")

    group = models.CharField(max_length=128, verbose_name="Группы")
    name = models.CharField(max_length=256, verbose_name="Название предмета")
    type = models.CharField(max_length=128, verbose_name="Тип пары",
                            help_text="Семинар, лекция, лабораторные занятия либо пользовательский тип")

    cabinet = models.CharField(max_length=128, blank=True, null=True, verbose_name='Кабинет')
    subgroup = models.CharField(max_length=128, blank=True, null=True, verbose_name='Подгруппа')

    schedule = models.ForeignKey(Schedule, on_delete=models.CASCADE, related_name='lessons', verbose_name="Расписание",
                                 help_text="Пара обязательно должна быть привязана к объекту расписания. Если нет объекта с нужным преподавателем, создайте нажал на зелёный плюс. Для одного преподавателя доступно только одно расписание")

    def __str__(self):
        return self.name + " - " + self.group

    class Meta:
        verbose_name = "Пара"
        verbose_name_plural = "Пары"


class ScheduleLessonDate(models.Model):
    start_date = models.CharField(max_length=5, verbose_name="Дата начала", validators=[validate_lesson_date_format])
    end_date = models.CharField(max_length=5, blank=True, null=True, verbose_name="Дата конца (опционально)",
                                validators=[validate_lesson_date_format])
    alternatively_period = models.BooleanField(default=False, verbose_name="Через неделю?",
                                               help_text="Да - через неделю. Нет - каждая неделя")

    lesson = models.ForeignKey(ScheduleLesson, on_delete=models.CASCADE, related_name='dates')

    def __str__(self):
        return self.start_date + ((' - ' + self.end_date) if self.is_period else '') + ' ' + (
            'ч.н.' if self.alternatively_period else ('к.н.' if self.is_period else ''))

    @property
    def is_period(self):
        return self.end_date is not None

    def clean(self):
        # Вызов валидатора для проверки формата и корректности дат
        super().clean()

        if self.is_period:
            now = datetime.now()
            start_day, start_month = map(int, self.start_date.split('.'))
            end_day, end_month = map(int, self.end_date.split('.'))

            start_date = datetime(now.year, start_month, start_day)
            end_date = datetime(now.year, end_month, end_day)

            if start_date >= end_date:
                raise ValidationError('Дата начала должна быть меньше даты конца')

    class Meta:
        verbose_name = "Дата пары"
        verbose_name_plural = "Даты пар"
