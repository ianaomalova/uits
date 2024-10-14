from django.contrib import admin
from .models import Achievement
from django.utils.translation import gettext_lazy as _


@admin.register(Achievement)
class AchievementAdmin(admin.ModelAdmin):
    fieldsets = (
        (_("Основная информация"), {'fields': ('title', 'description', 'content', 'is_published', 'teacher')}),
        (_("Изображение"), {'fields': ('image',), 'classes': ('collapse',)}),
    )
    list_display = (
        'title',
        'description',
        'content',
        'image',
        'is_published',
        'teacher'
    )
    readonly_fields = ('created_at',)
    search_fields = ('title', 'description', 'content')
