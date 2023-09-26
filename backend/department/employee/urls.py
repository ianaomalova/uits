from django.urls import path

from .views import TeacherAPIViewSet

urlpatterns = [
    path('teachers/', TeacherAPIViewSet.as_view({
        'get': 'list',
        'post': 'create'
    }))
]
