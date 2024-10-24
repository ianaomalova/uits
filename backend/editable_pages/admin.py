from django.contrib import admin
from django.db import models
from editable_pages.models import EditablePage
from mdeditor.widgets import MDEditorWidget

# Register your models here.
class EditablePageAdmin(admin.ModelAdmin):
  formfield_overrides = {
        models.TextField: {'widget': MDEditorWidget}
    }
  
admin.site.register(EditablePage, EditablePageAdmin)