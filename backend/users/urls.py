from django.urls import path, include

from users.views import UserViewSet

urlpatterns = [
    path('auth/', include('dj_rest_auth.urls')),
    path('events/', include('events.urls')),
    path('', UserViewSet.as_view({'get': 'list'})),
]
