from django.contrib.auth import get_user_model
from django.db import models
from django.conf import settings
from imagekit.models import ImageSpecField, ProcessedImageField
from imagekit.processors import ResizeToFit, Resize
from django_quill.fields import QuillField

User = get_user_model()


# Create your models here.
class Post(models.Model):
    title = models.CharField(max_length=100, verbose_name="Заголовок", default="")
    short_description = models.TextField(max_length=280)

    preview_image = ProcessedImageField(
        verbose_name="Превью фото",
        upload_to="photos/%Y/%m/%d",
        processors=[ResizeToFit(800)],  # Указываем только максимальную ширину
        format='JPEG',
        options={'quality': 60}
    )
    preview_thumbnail = ImageSpecField(source="preview_image",
                                       processors=[ResizeToFit(240)],
                                       format='JPEG',
                                       options={'quality': 60})
    preview_image_description = models.CharField(max_length=256, default="")

    content = QuillField()
    created_at = models.DateTimeField(auto_now_add=True)
    display = models.BooleanField(verbose_name='Отображать?', default=False)
    author = models.ForeignKey(User, blank=True, null=True, on_delete=models.SET_NULL)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'пост'
        verbose_name_plural = 'посты'
