from django.urls import path, include
from department.news.models import Post
urlpatterns = [
    path('auth/', include('dj_rest_auth.urls')),

]