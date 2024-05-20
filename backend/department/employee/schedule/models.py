from typing import List

from django.db import models

from department.employee.schedule.managers import ScheduleManager


class Schedule(models.Model):
    teacher = models.OneToOneField('employee.teacher', on_delete=models.CASCADE, related_name='schedule')

    objects = ScheduleManager()

    def create_days(self) -> List['ScheduleDay']:
        week_numbers = range(1, 7)
        days = []
        for week_number in week_numbers:
            days.append(ScheduleDay(week_number=week_number, schedule=self))

        ScheduleDay.objects.bulk_create(days)
        return self.days


class ScheduleDay(models.Model):
    class ScheduleWeekNumber(models.IntegerChoices):
        MONDAY = 1
        TUESDAY = 2
        WEDNESDAY = 3
        THURSDAY = 4
        FRIDAY = 5
        SATURDAY = 6

    week_number = models.IntegerField(choices=ScheduleWeekNumber.choices)
    schedule = models.ForeignKey(Schedule, on_delete=models.CASCADE, related_name='days')

    def class_times_for_bulk_save(self, class_numbers=None) -> List['ScheduleClassTime']:
        _class_numbers = class_numbers if class_numbers is not None else range(1, 9)
        class_times = [ScheduleClassTime(class_number=class_num, day=self) for class_num in _class_numbers]
        return class_times


class ScheduleClassTime(models.Model):
    class ClassTime(models.IntegerChoices):
        FIRST = 1
        SECOND = 2
        THIRD = 3
        FOURTH = 4
        FIFTH = 5
        SIXTH = 6
        SEVENTH = 7
        EIGHTH = 8

    class_number = models.IntegerField(choices=ClassTime.choices)
    day = models.ForeignKey(ScheduleDay, on_delete=models.CASCADE, related_name='class_times')

class ScheduleLesson(models.Model):


    class_time = models.ForeignKey(ScheduleClassTime, on_delete=models.CASCADE, related_name='lessons')

    group = models.CharField(max_length=128)
    name = models.CharField(max_length=256)
    type = models.CharField(max_length=128)

    cabinet = models.CharField(max_length=128, blank=True, null=True)
    subgroup = models.CharField(max_length=128, blank=True, null=True)


class ScheduleLessonDate(models.Model):
    start_date = models.CharField(max_length=50)
    end_date = models.CharField(max_length=50, blank=True, null=True)
    is_period = models.BooleanField(default=False)
    alternatively_period = models.BooleanField(default=False)

    lesson = models.ForeignKey(ScheduleLesson, on_delete=models.CASCADE, related_name='dates')
