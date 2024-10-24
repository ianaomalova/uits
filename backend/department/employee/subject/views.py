from django.shortcuts import render

from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from .models import Subject
from .serializers import SubjectSerializer

from department.employee.models import Teacher

# Create your views here.
class SubjectAPIViewSet(ModelViewSet):
    queryset = Subject.objects.all().order_by('name')