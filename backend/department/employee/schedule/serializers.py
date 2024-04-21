from department.employee.schedule.models import Schedule, ScheduleDay, ScheduleClassTime, \
    ScheduleLesson, ScheduleLessonDate
from rest_framework import serializers


class ScheduleLessonDateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ScheduleLessonDate
        fields = ['id', 'start_date', 'end_date', 'is_period', 'alternatively_period']


class ScheduleLessonSerializer(serializers.ModelSerializer):
    dates = ScheduleLessonDateSerializer(many=True)

    class Meta:
        model = ScheduleLesson
        fields = ['id', 'group', 'name', 'type', 'cabinet', 'subgroup', 'dates']


class ScheduleClassTimeSerializer(serializers.ModelSerializer):
    lessons = ScheduleLessonSerializer(many=True)

    class Meta:
        model = ScheduleClassTime
        fields = ['id', 'class_number', 'lessons']


class ScheduleDaySerializer(serializers.ModelSerializer):
    class_times = ScheduleClassTimeSerializer(many=True)

    class Meta:
        model = ScheduleDay
        fields = ['id', 'week_number', 'class_times']


class ScheduleSerializer(serializers.ModelSerializer):
    days = ScheduleDaySerializer(many=True)

    class Meta:
        model = Schedule
        fields = ['id', 'teacher', 'days']
