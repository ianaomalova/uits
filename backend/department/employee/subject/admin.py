from django.contrib import admin
from department.employee.models import Teacher
from department.employee.subject.models import Subject

# SubjectAdmin Описание страницы админки с редактированием дисциплин
@admin.register(Subject)
class SubjectAdmin(admin.ModelAdmin):
    fieldsets = [
        (
            "Общая информация", {"fields": ["name", "description"]}
        )
    ]
