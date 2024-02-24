from django.contrib import admin
from .models import Post
from django.conf import settings

# Register your models here.
@admin.register(Post)
class PostModelAdmin(admin.ModelAdmin):
    list_display = ['pk','author', 'created_at', 'display']
    list_editable = ['display']
