from django.urls import path

from .views import EmployeeAPIViewSet

urlpatterns = [
    path('employee/', EmployeeAPIViewSet.as_view({
        'get': 'list'
    }))
]
