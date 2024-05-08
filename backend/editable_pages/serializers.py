from rest_framework import serializers

from editable_pages.models import EditablePage


class EditablePageSerializer(serializers.ModelSerializer):
    class Meta:
        model = EditablePage
        fields = '__all__'
