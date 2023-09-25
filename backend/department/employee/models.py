from django.db import models


# Create your models here.
class Employee(models.Model):
    # Основная информация
    first_name = models.CharField(max_length=50)
    lastname = models.CharField(max_length=50)
    patronymic = models.CharField(max_length=50, blank=True, null=True)

    # Степень и звание
    degree = models.CharField(max_length=100)
    rank = models.CharField(max_length=100)

    # Общая информация
    bio = models.TextField