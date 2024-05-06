from rest_framework import serializers

from .models import Teacher, HelpersEmployee


class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = '__all__'


class HelpersEmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = HelpersEmployee
        fields = '__all__'
