from rest_framework import status
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from users.permissions import IsModerator
from .models import Post
from .serializers import PostSerializer, CreatePostSerializer, ListPostSerializer


# Create your views here.
class PostAPIViewSet(ModelViewSet):
    queryset = Post.objects.filter(display=True, post_type=Post.PostType.NEWS).order_by('-created_at')
    serializer_class = PostSerializer
    permission_classes = [IsModerator]

    def create(self, request, *args, **kwargs):
        request.data['author'] = request.user.id
        request.data['display'] = True
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def get_serializer_class(self, *args, **kwargs):
        match self.action:
            case 'list':
                return ListPostSerializer
            case 'create':
                return CreatePostSerializer
            case _:
                return self.serializer_class


class AnnouncementAPIViewSet(PostAPIViewSet):
    queryset = Post.objects.filter(display=True, post_type=Post.PostType.ANNOUNCEMENT).order_by('-created_at')