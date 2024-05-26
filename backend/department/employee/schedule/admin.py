from django.contrib import admin

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


# Регистрация модели ScheduleLessonDate с настройками админ-панели
# @admin.register(ScheduleLessonDate)
class ScheduleLessonDateAdmin(admin.ModelAdmin):
    list_display = ('start_date', 'end_date', 'is_period', 'alternatively_period', 'lesson')
    search_fields = ('start_date', 'end_date', 'lesson__name')
    list_filter = ('is_period', 'alternatively_period')
    list_editable = ('end_date', 'is_period', 'alternatively_period')
