from django.contrib import admin
from .models import Achievement


@admin.register(Achievement)
class AchievementAdmin(admin.ModelAdmin):
    list_display = (
        'title',
        'description',
        'content',
        'author',
        'image',
    )
    readonly_fields = ('created_at',)
    list_filter = ('author',)
    search_fields = ('title', 'description', 'content')
