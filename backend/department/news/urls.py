from django.urls import path

from .views import PostAPIViewSet

urlpatterns = [
    path('posts/', PostAPIViewSet.as_view({
        'get': 'list',
        'post': 'create'
    })),
    path('posts/<int:pk>', PostAPIViewSet.as_view({
        'delete': 'destroy',
        'patch': 'partial_update',
        'get': 'retrieve'
    }))
]
