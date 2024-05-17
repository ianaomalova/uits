from django.urls import path

from .views import EventModelViewSet

urlpatterns = [
    path('', EventModelViewSet.as_view(), name='event-list'),
]
