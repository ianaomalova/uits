from rest_framework.viewsets import ModelViewSet

from .models import Employee
from .serializers import EmployeeSerializer


# Create your views here.

class EmployeeAPIViewSet(ModelViewSet):
    queryset = Employee.objects.all().order_by('last_name', 'first_name', 'patronymic')
    serializer_class = EmployeeSerializer
    # Permission
