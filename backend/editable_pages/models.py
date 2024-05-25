from django.db import models


# Create your models here.
class EditablePage(models.Model):
    title = models.CharField(max_length=255, verbose_name="Название страницы (для отображения в админ-панели)",
                             blank=True, null=True)
    text = models.TextField(verbose_name='Контент Markdown', blank=True)
    page = models.SlugField(max_length=100, verbose_name='Идентификатор страницы', unique=True)
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Дата создания')
    modified_at = models.DateTimeField(auto_now=True, verbose_name='Дата изменения')

    def __str__(self):
        return ("Страница " + self.page + " от " + self.modified_at.date().strftime(
            "%d.%m.%Y")) if not self.title else self.title

    class Meta:
        verbose_name = 'редактируемая страница'
        verbose_name_plural = 'редактируемые страницы'
