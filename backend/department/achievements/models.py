from django.contrib.auth import get_user_model
from django.db import models
from imagekit.models import ImageSpecField, ProcessedImageField
from imagekit.processors import ResizeToFit
from department.employee.models import Teacher
from django_quill import fields

User = get_user_model()


class Achievement(models.Model):
    title = models.CharField(max_length=100, verbose_name="Заголовок")
    description = models.TextField(verbose_name="Краткое описание")
    content = fields.QuillField(verbose_name="Содержание")

    image = ProcessedImageField(
        verbose_name="Превью фото",
        upload_to="photos/%Y/%m/%d",
        processors=[ResizeToFit(800)],
        format='JPEG',
        options={'quality': 60},
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name="Дата создания"
    )

    is_published = models.BooleanField(
        verbose_name="Опубликовано",
        default=False
    )

    teacher = models.ForeignKey(
        Teacher,
        blank=True,
        null=True,
        on_delete=models.SET_NULL,
        verbose_name="Привязан к",
        related_name="achievements"
    )

    class Meta:
        verbose_name = 'достижение'
        verbose_name_plural = 'достижения'

    def __str__(self):
        return self.title
