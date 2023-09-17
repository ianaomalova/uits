from django.urls import path, include

urlpatterns = [
    path('news/', include('department.news.urls'))
]