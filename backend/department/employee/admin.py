from django.contrib import admin

from department.employee.models import Teacher, HelpersEmployee


# Register your models here.


@admin.register(Teacher)
class TeacherAdmin(admin.ModelAdmin):
    pass


@admin.register(HelpersEmployee)
class HelpersEmployeeAdmin(admin.ModelAdmin):
    pass
