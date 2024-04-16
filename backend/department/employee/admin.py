from django.contrib import admin

from department.employee.models import Teacher


# Register your models here.


@admin.register(Teacher)
class TeacherAdmin(admin.ModelAdmin):
    pass
