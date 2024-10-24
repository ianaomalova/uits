from django.db import models


# Subject Модель описания дисциплины
class Subject(models.Model):
    
    class Meta:
        verbose_name = 'учебная дисциплина'
        verbose_name_plural = 'учебные дисциплины'
    
    name = models.CharField(max_length=100, verbose_name='Наименование дисциплины')
    description = models.TextField(blank=True, null=True, verbose_name='Описание дисциплины')

    def __str__(self):
        return self.name
