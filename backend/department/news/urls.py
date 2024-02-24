from django.urls import path

from .views import PostAPIViewSet, AnnouncementAPIViewSet

urlpatterns = [
    path('posts/', PostAPIViewSet.as_view({
        'get': 'list',
        'post': 'create'
    })),
    path('posts/<int:pk>', PostAPIViewSet.as_view({
        'get': 'retrieve'
    })),
    path('announcements/', AnnouncementAPIViewSet.as_view({
        'get': 'list',
        'post': 'create'
    })),
    path('announcements/<int:pk>', AnnouncementAPIViewSet.as_view({
        'get': 'retrieve'
    }))
]
