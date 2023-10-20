from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model()


# Create your models here.
class Post(models.Model):
    title = models.CharField(max_length=100, verbose_name="Заголовок", default="")
    short_description = models.TextField()
    # preview_image = models.ImageField(verbose_name="Превью фото", upload_to="photos/")
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    display = models.BooleanField(verbose_name='Отображать?', default=False)
    author = models.ForeignKey(User, blank=True, null=True, on_delete=models.SET_NULL)

    class Meta:
        verbose_name = 'пост'
        verbose_name_plural = 'посты'