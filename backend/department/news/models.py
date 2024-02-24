from django.contrib.auth import get_user_model
from django.db import models
from imagekit.models import ImageSpecField, ProcessedImageField
from imagekit.processors import ResizeToFit
from django_quill.fields import QuillField

User = get_user_model()


# Create your models here.
class Post(models.Model):
    class PostType(models.TextChoices):
        NEWS = 'NEWS'
        ANNOUNCEMENT = 'ANNOUNCEMENT'

    title = models.CharField(max_length=100, verbose_name="Заголовок", default="")
    short_description = models.TextField(max_length=280, verbose_name="Краткое описание")
    post_type = models.CharField(choices=PostType.choices, default=PostType.NEWS, max_length=12, verbose_name="Тип поста")

    preview_image = ProcessedImageField(
        verbose_name="Превью фото",
        upload_to="photos/%Y/%m/%d",
        processors=[ResizeToFit(800)],  # Указываем только максимальную ширину
        format='JPEG',
        options={'quality': 60},
    )
    preview_thumbnail = ImageSpecField(source="preview_image",
                                       processors=[ResizeToFit(240)],
                                       format='JPEG',
                                       options={'quality': 60})
    preview_image_description = models.CharField(max_length=256, default="", verbose_name="Краткое описание фотографии")

    content = QuillField(verbose_name="Содержание статьи")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Дата создания")
    display = models.BooleanField(verbose_name='Отображать?', default=False)
    author = models.ForeignKey(User, blank=True, null=True, on_delete=models.SET_NULL, verbose_name="Автор")

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'пост'
        verbose_name_plural = 'посты'


class Announcement(models.Model):
    title = models.CharField(max_length=100, verbose_name="Заголовок", default="")
    short_description = models.TextField()
