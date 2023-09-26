from django.db import models


# Create your models here.
class Employee(models.Model):
    # Основная информация
    last_name = models.CharField(max_length=50)
    first_name = models.CharField(max_length=50)
    patronymic = models.CharField(max_length=50, blank=True, null=True)

    # Степень, звание, должность
    degree = models.CharField(max_length=100, blank=True, null=True)
    rank = models.CharField(max_length=100, blank=True, null=True)
    position = models.CharField(max_length=100, blank=True, null=True)

    # Общая информация
    bio = models.TextField(blank=True, null=True)