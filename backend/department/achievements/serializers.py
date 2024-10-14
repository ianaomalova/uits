from rest_framework import serializers
from rest_framework.relations import SlugRelatedField
from .models import Achievement


class AchievementSerializer(serializers.ModelSerializer):
    teacher = SlugRelatedField(slug_field='full_name', read_only=True)

    class Meta:
        model = Achievement
        fields = (
            'id', 'title', 'description', 'content', 'image',
            'created_at', 'is_published', 'teacher', 'teacher_id'
        )
