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
            "Преподаваемые дисциплины", {"fields": ["subjects"]}
        ),
        (
            "Контакты", {
                "classes": ["collapse"],
                "fields": ["phone_number", "email", "messenger"]
                }
        ),
        (
            "Образование и квалификация", {
                "classes": ["collapse"],
                "fields": ["education", "qualification"] 
                }
        ),
        (
            "Биография", {
                "classes": ["collapse"],
                "fields": ["bio"]
            }
        )
        
    ]


@admin.register(HelpersEmployee)
class HelpersEmployeeAdmin(admin.ModelAdmin):
    pass
