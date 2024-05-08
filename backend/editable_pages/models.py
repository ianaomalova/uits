from django.db import models


# Create your models here.
class EditablePage(models.Model):
    text = models.TextField(verbose_name='Контент Markdown')
    page = models.SlugField(max_length=100, verbose_name='Идентификатор страницы', unique=True)
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Дата создания')
    modified_at = models.DateTimeField(auto_now=True, verbose_name='Дата изменения')

    def __str__(self):
        return "Страница " + self.page + " от " + self.modified_at.date().strftime("%d.%m.%Y")

    class Meta:
        verbose_name = 'редактируемая страница'
        verbose_name_plural = 'редактируемые страницы'