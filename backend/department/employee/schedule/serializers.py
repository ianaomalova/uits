from department.employee.schedule.models import Schedule, ScheduleLesson, ScheduleLessonDate
from rest_framework import serializers


class ScheduleLessonDateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ScheduleLessonDate
        fields = ['id', 'start_date', 'end_date', 'alternatively_period']


class ScheduleLessonSerializer(serializers.ModelSerializer):
    dates = ScheduleLessonDateSerializer(many=True)

    class Meta:
        model = ScheduleLesson
        fields = ['id', 'group', 'name', 'type', 'cabinet', 'subgroup', 'dates', 'class_time', 'week_number']


class ScheduleSerializer(serializers.ModelSerializer):
    lessons = ScheduleLessonSerializer(many=True)

    class Meta:
        model = Schedule
        fields = ['id', 'teacher', 'lessons']
