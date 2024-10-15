# department/employee/forms.py

from django import forms
from .models import Teacher
from django.db import connection

class TeacherForm(forms.ModelForm):
    teacher = forms.ChoiceField(choices=[], required=False, label="Привязать к пользователю:")

    class Meta:
        model = Teacher
        fields = ['avatar', 'last_name', 'first_name', 'patronymic', 'teacher', 'degree', 'rank', 'position', 'bio']

    def __init__(self, *args, **kwargs):
        super(TeacherForm, self).__init__(*args, **kwargs)
        # Выполните ваш SQL-скрипт для загрузки данных в выпадающий список
        with connection.cursor() as cursor:
            cursor.execute("SELECT id, username FROM users_user")
            rows = cursor.fetchall()
            choices = [(row[0], row[1]) for row in rows]
            choices.insert(0, (-1, '---'))  # Добавьте значение null
            self.fields['teacher'].choices = choices

        # Установите выбранное значение при редактировании
        if self.instance.pk:
            with connection.cursor() as cursor:
                cursor.execute("SELECT user_id FROM employee_teacher WHERE id = %s", [self.instance.pk])
                selected_value = cursor.fetchone()
                if selected_value:
                    self.fields['teacher'].initial = selected_value[0]

    def save(self, *args, **kwargs):
        instance = super(TeacherForm, self).save(*args, **kwargs)
        teacher_id = self.cleaned_data.get('teacher')
        if teacher_id:
            instance.user_id = teacher_id
            instance.save()
        return instance
