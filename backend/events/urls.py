from django.urls import path

from .views import EventModelViewSet

urlpatterns = [
    path('', EventModelViewSet.as_view({
        'get': 'list',
        'post': 'create',
    }), name='event-list'),
    path('<int:pk>', EventModelViewSet.as_view({
        'get': 'retrieve',
        'patch': 'partial_update',
        'delete': 'destroy'
    }), name='event-destroy'),
]
