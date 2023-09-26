from rest_framework import serializers

from .models import Teacher


class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = '__all__'
        extra_kwargs = {
            'last_name': {'required': True},
            'first_name': {'required': True},
            'patronymic': {'required': True},
            'degree': {'required': True},
            'rank': {'required': True},
            'position': {'required': True},
            'bio': {'required': True},
        }
