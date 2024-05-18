from rest_framework import viewsets, permissions

from events.models import UserEvent
from events.serializers import EventSerializer
from django.db.models import Q

from users.permissions import IsTeacher


# Create your views here.
class EventModelViewSet(viewsets.ModelViewSet):
    serializer_class = EventSerializer
    permission_classes = [IsTeacher]

    # преподу - созданные и присвоенные ему
    # суперпользователю - созданные и присвоенные ему
    def get_queryset(self):
        user = self.request.user
        return UserEvent.objects.filter(Q(user=user) | Q(assigned_users__in=[user.id])).distinct() \
            if user.is_teacher or user.is_superuser else UserEvent.objects.none()

    def perform_create(self, serializer):
        user = self.request.user
        save_params = {
            'user': user,
        }
        if user.is_teacher and not user.is_superuser:
            save_params['assigned_users'] = [user.id]
        serializer.save(**save_params)
