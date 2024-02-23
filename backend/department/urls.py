from django.urls import path, include

urlpatterns = [
    path('news/', include('department.news.urls')),
    path('employee/', include('department.employee.urls'))
]
