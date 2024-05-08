from django.contrib import admin

from editable_pages.models import EditablePage


# Register your models here.
@admin.register(EditablePage)
class EditablePageAdmin(admin.ModelAdmin):
    pass
