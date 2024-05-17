from rest_framework import viewsets, permissions

from events.models import UserEvent
from events.serializers import EventSerializer


# Create your views here.
class EventModelViewSet(viewsets.ModelViewSet):
    queryset = UserEvent.objects.all()
    serializer_class = EventSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
