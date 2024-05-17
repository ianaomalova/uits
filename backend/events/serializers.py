from rest_framework import serializers

from events.models import UserEvent


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserEvent
        fields = '__all__'
