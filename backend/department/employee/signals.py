# department/employee/signals.py

from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Teacher
from django.db import connection

@receiver(post_save, sender=Teacher)
def update_user_id(sender, instance, created, **kwargs):
    if not created:
        teacher_id = instance.user_id
        if teacher_id != '-1':
            with connection.cursor() as cursor:
                cursor.execute("UPDATE employee_teacher SET user_id = NULL WHERE user_id = %s", [teacher_id])
                cursor.execute("UPDATE employee_teacher SET user_id = %s WHERE id = %s", [teacher_id, instance.pk])
        else:
            with connection.cursor() as cursor:
                cursor.execute("UPDATE employee_teacher SET user_id = NULL WHERE id = %s", [instance.pk])
