from dj_rest_auth.app_settings import api_settings
from rest_framework import serializers

from .models import Post


class ListPostSerializer(serializers.ModelSerializer):
    author = api_settings.USER_DETAILS_SERIALIZER()
    preview_thumbnail = serializers.SerializerMethodField()

    def get_preview_thumbnail(self, obj):
        if obj.preview_thumbnail:
            return obj.preview_thumbnail.url
        return None

    class Meta:
        model = Post
        fields = ['id', 'title', 'short_description',
                  'preview_image', 'preview_thumbnail', 'created_at', 'author']


class PostSerializer(serializers.ModelSerializer):
    author = api_settings.USER_DETAILS_SERIALIZER()
    content = serializers.CharField(source='content.html')

    class Meta:
        model = Post
        fields = '__all__'


class CreatePostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['title', 'short_description',
                  'content', 'preview_image',
                  'author', 'display']
