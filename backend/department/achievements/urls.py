from django.urls import path

from .views import AchievementAPIViewSet

urlpatterns = [
    path('', AchievementAPIViewSet.as_view({
        'get': 'list',
        'post': 'create'
    })),
    path('<int:pk>/', AchievementAPIViewSet.as_view({
        'get': 'retrieve'
    }))
]