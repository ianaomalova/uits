from rest_framework import status
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from .models import Achievement
from .serializers import AchievementSerializer
from users.permissions import IsModeratorOrReadOnly


class AchievementAPIViewSet(ModelViewSet):

    queryset = Achievement.objects.all()
    serializer_class = AchievementSerializer

    permission_classes = [IsModeratorOrReadOnly]

    def create(self, request, *args, **kwargs):
        request.data['author'] = request.user.id
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
