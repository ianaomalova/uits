from dj_rest_auth.app_settings import api_settings
from rest_framework import serializers

from .models import Post


class PostSerializer(serializers.ModelSerializer):
    author = api_settings.USER_DETAILS_SERIALIZER()

    class Meta:
        model = Post
        fields = '__all__'


class CreatePostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['title', 'short_description',
                  'content', 'author', 'display']
