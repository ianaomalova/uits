from django.core.files.uploadedfile import InMemoryUploadedFile
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from .models import Teacher
from .serializers import TeacherSerializer


# Create your views here.

class TeacherAPIViewSet(ModelViewSet):
    queryset = Teacher.objects.all().order_by('last_name', 'first_name', 'patronymic')
    serializer_class = TeacherSerializer

    @action(detail=True, methods=['POST'], url_path='schedule')
    def import_schedule(self, request, *args, **kwargs):
        employee: Teacher = self.get_object()
        file: InMemoryUploadedFile = request.FILES['file']

        print(employee, file)
        print(request.data)
        employee.import_schedule(file)
        # return Response(employee.import_schedule(file))
        return Response(status=200)
