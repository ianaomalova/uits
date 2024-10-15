# signals.py

from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth import get_user_model
from django.db import connection

User = get_user_model()

@receiver(post_save, sender=User)
def update_teacher_id(sender, instance, created, **kwargs):
    teacher_id = instance.teacher_id if hasattr(instance, 'teacher_id') else None
    if not created:
        if teacher_id and teacher_id != '-1':
            with connection.cursor() as cursor:
                cursor.execute("UPDATE employee_teacher SET user_id = NULL WHERE user_id = %s", [instance.pk])
                cursor.execute("UPDATE employee_teacher SET user_id = %s WHERE id = %s", [instance.pk, teacher_id])
        else:
            with connection.cursor() as cursor:
                print(instance.pk)
                cursor.execute("UPDATE employee_teacher SET user_id = NULL WHERE user_id = %s", [instance.pk])
