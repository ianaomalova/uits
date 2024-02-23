from django.contrib import admin
from .models import Post


# Register your models here.
@admin.register(Post)
class PostModelAdmin(admin.ModelAdmin):
    list_display = ['pk','author', 'created_at', 'display']
    list_editable = ['display']
