from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AchievementAPIViewSet

router = DefaultRouter()
router.register('', AchievementAPIViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
