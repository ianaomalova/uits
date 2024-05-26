from django.contrib import admin
from django.http import HttpResponseRedirect

from department.employee.models import Teacher
from department.employee.schedule.forms import ScheduleLessonDateForm
from department.employee.schedule.models import Schedule, ScheduleLesson, ScheduleLessonDate


# Подключение инлайнов для связи ScheduleLesson с ScheduleLessonDate
class ScheduleLessonDateInline(admin.TabularInline):
    model = ScheduleLessonDate
    form = ScheduleLessonDateForm
    extra = 1


@admin.register(Schedule)
class ScheduleAdmin(admin.ModelAdmin):
    list_display = ('teacher', 'imported_file_name')
    search_fields = ('teacher__name',)
    list_filter = ('teacher',)


# Регистрация модели ScheduleLesson с настройками админ-панели
@admin.register(ScheduleLesson)
class ScheduleLessonAdmin(admin.ModelAdmin):
    list_display = ('name', 'group', 'class_time', 'week_number', 'schedule')
    search_fields = ('name', 'group', 'schedule__teacher__name')
    list_filter = ('week_number', 'class_time', 'group', 'schedule__teacher')
    list_editable = ('class_time', 'week_number', 'group')
    ordering = ('week_number', 'class_time')
    inlines = [ScheduleLessonDateInline]

    def get_queryset(self, request):
        # Получить первоначальный queryset
        qs = super().get_queryset(request)
        if 'change' in request.path or 'delete' in request.path or 'add' in request.path:
            return qs
        # Получить значение фильтра schedule из GET параметров
        teacher_id = request.GET.get('schedule__teacher__id__exact')
        # Если фильтр не установлен, возвращать пустой queryset
        if not teacher_id:
            return qs.none()
        # Возвращать отфильтрованный queryset
        return qs.filter(schedule__teacher__id__exact=teacher_id)

    def changelist_view(self, request, extra_context=None):
        # Получить значение фильтра schedule из GET параметров
        teacher_id = request.GET.get('schedule__teacher__id__exact')
        if not teacher_id:
            # Если фильтр не установлен, выбрать первую запись Schedule
            first_schedule = Teacher.objects.filter(schedule__isnull=False).order_by('-schedule__id').first()
            if first_schedule:
                return HttpResponseRedirect(f'{request.path}?schedule__teacher__id__exact={first_schedule.id}')
            else:
                self.message_user(request, "Нет доступных расписаний для просмотра.", level='warning')

        # Добавление пользовательского контекста
        if extra_context is None:
            extra_context = {}
        info = f'Сейчас выбран {Teacher.objects.get(pk=teacher_id)}' if teacher_id else 'Пожалуйста, выберите преподавателя для просмотра расписания пар.'
        extra_context['chosen_color_info'] = '#66ff00' if teacher_id else 'red'
        extra_context['description'] = (
                    'Данные отображаемые на этой странице всегда будут отфильтрованы по преподавателю в меню справа внизу. \n',
                    'После изменений на этой странице нажмите "Сохранить" внизу страницы.',
                    'Если хотите подробно отредактировать элемент(его даты и тд) - нажмите на него',
        )
        extra_context['info'] = info

        return super().changelist_view(request, extra_context=extra_context)


# Регистрация модели ScheduleLessonDate с настройками админ-панели
# @admin.register(ScheduleLessonDate)
class ScheduleLessonDateAdmin(admin.ModelAdmin):
    list_display = ('start_date', 'end_date', 'is_period', 'alternatively_period', 'lesson')
    search_fields = ('start_date', 'end_date', 'lesson__name')
    list_filter = ('is_period', 'alternatively_period')
    list_editable = ('end_date', 'is_period', 'alternatively_period')
