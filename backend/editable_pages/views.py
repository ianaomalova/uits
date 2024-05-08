from django.db.models import OuterRef, Subquery
from rest_framework import generics

from editable_pages.models import EditablePage
from editable_pages.serializers import EditablePageSerializer
from users import permissions


# Create your views here.
class EditablePageAPIView(generics.RetrieveUpdateAPIView):
    serializer_class = EditablePageSerializer
    permission_classes = [permissions.IsModerator]
    lookup_field = 'page'
    lookup_url_kwarg = 'page'

    def get_queryset(self):
        subquery = EditablePage.objects.filter(page=OuterRef('page')).order_by('-modified_at').values('id')[:1]
        return EditablePage.objects.filter(id=Subquery(subquery)).order_by('page', '-modified_at')
