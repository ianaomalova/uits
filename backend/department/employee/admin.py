from django.contrib import admin
from department.employee.forms import TeacherForm
from department.employee.models import Teacher, HelpersEmployee


# Register your models here.


@admin.register(Teacher)
class TeacherAdmin(admin.ModelAdmin):
    form = TeacherForm


@admin.register(HelpersEmployee)
class HelpersEmployeeAdmin(admin.ModelAdmin):
    pass
