from django.core.files.uploadedfile import InMemoryUploadedFile
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from .models import Teacher, HelpersEmployee
from .schedule.serializers import ScheduleSerializer
from .serializers import TeacherSerializer, HelpersEmployeeSerializer


# Create your views here.
def teacher_view(request):
    print(f"Teacher: 888888888888")
    if request.method == 'POST':
        form = TeacherForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('success_url')  # Замените на ваш URL
        else:
            print(form.errors)
    else:
        print(form.errors)
        form = TeacherForm()

    return render(request, 'teacher_template.html', {'form': form})


class TeacherAPIViewSet(ModelViewSet):
    queryset = Teacher.objects.all().order_by('last_name', 'first_name', 'patronymic')
    serializer_class = TeacherSerializer

    @action(detail=True, methods=['POST'], url_path='schedule')
    def import_schedule(self, request, *args, **kwargs):
        teacher: Teacher = self.get_object()
        file: InMemoryUploadedFile = request.FILES['file']

        print(teacher, file)
        print(request.data)
        teacher.import_schedule(file)
        return Response(status=200)

    @action(detail=True, methods=['get'], url_path='schedule')
    def retrieve_schedule(self, request, *args, **kwargs):
        teacher: Teacher = self.get_object()
        serializer = ScheduleSerializer(teacher.schedule)
        return Response(serializer.data)

    @action(detail=True, methods=['patch'], url_path='schedule')
    def update_schedule(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        teacher = self.get_object()
        instance = teacher.schedule
        serializer = ScheduleSerializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)

    def partial_update(self, request, *args, **kwargs):
        kwargs['partial'] = True
        return self.update(request, *args, **kwargs)


class HelpersEmployeeViewSet(ModelViewSet):
    queryset = HelpersEmployee.objects.all().order_by('last_name', 'first_name', 'patronymic')
    serializer_class = HelpersEmployeeSerializer
