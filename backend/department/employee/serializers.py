from rest_framework import serializers

from .models import Teacher, HelpersEmployee


class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = [
            'id',
            'avatar',
            'last_name',
            'first_name',
            'patronymic',
            'phone_number',
            'email',
            'messenger',
            'degree',
            'rank',
            'position',
            'experience',
            'professional_experience',
            'education',
            'qualification',
            'bio',
            'schedule'
            ]


class HelpersEmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = HelpersEmployee
        fields = '__all__'
