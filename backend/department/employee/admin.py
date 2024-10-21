from django.contrib import admin

from department.employee.models import Teacher, HelpersEmployee


# Register your models here.


@admin.register(Teacher)
class TeacherAdmin(admin.ModelAdmin):
    fieldsets = [
        (
            "Общая информация", {"fields": ["last_name", "first_name", "patronymic",
                                            "degree", "rank", "position",
                                            "experience", "professional_experience"
                                            ] }
        ),
        (
            "Контакты", {"fields": ["phone_number", "email", "messenger"] }
        ),
        (
            "Образование и квалификация", {"fields": ["education", "qualification"] }
        ),
        (
            "Биография", {"fields": ["bio"]}
        )
    ]


@admin.register(HelpersEmployee)
class HelpersEmployeeAdmin(admin.ModelAdmin):
    pass
