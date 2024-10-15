# admin.py

from django.contrib import admin
from django.utils.translation import gettext_lazy as _
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin
from django.db import connection
from django import forms

User = get_user_model()

class UserModelAdminForm(forms.ModelForm):
    teacher = forms.ChoiceField(choices=[], required=False, label=_("Привязать к преподавателю:"))

    class Meta:
        model = User
        fields = '__all__'

    def __init__(self, *args, **kwargs):
        super(UserModelAdminForm, self).__init__(*args, **kwargs)
        # Выполните ваш SQL-скрипт для загрузки данных в выпадающий список
        with connection.cursor() as cursor:
            cursor.execute("SELECT id, first_name, last_name, patronymic FROM employee_teacher")
            rows = cursor.fetchall()
            choices = [(row[0], f"{row[1]} {row[2]} {row[3]}") for row in rows]
            choices.insert(0, (-1, '---'))  # Добавьте значение null
            self.fields['teacher'].choices = choices

        if self.instance.pk:
            with connection.cursor() as cursor:
                print(self.instance.pk)
                cursor.execute("SELECT id FROM employee_teacher WHERE user_id = %s", [self.instance.pk])
                selected_value = cursor.fetchone()
                print(selected_value)
                if selected_value:
                    self.fields['teacher'].initial = selected_value[0]


    def save(self, commit=True):
        instance = super(UserModelAdminForm, self).save(commit=False)
        teacher_id = self.cleaned_data.get('teacher')
        if teacher_id:
            instance.teacher_id = teacher_id
        if commit:
            instance.save()
        return instance

@admin.register(User)
class UserModelAdmin(UserAdmin):
    form = UserModelAdminForm
    fieldsets = (
        (None, {"fields": ("username", "password")}),
        (_("Personal info"), {"fields": ("first_name", "last_name", "email", "avatar")}),
        (
            _("Permissions"),
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "groups",
                    "user_permissions",
                ),
            },
        ),
        (_("Роли"), {"fields": (
            "is_superuser",
            "is_moderator",
            "is_teacher"
        )}),
        (_("Ссылка на учителя"), {"fields": ("teacher",)}),  # Добавлено поле teacher
        (_("Important dates"), {"fields": ("last_login", "date_joined")}),
    )

