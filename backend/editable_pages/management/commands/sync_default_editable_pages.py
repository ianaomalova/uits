from django.core.management import BaseCommand
from django.conf import settings

from editable_pages.models import EditablePage


class Command(BaseCommand):
    help = "Синхронизирует данные с DEFAULT_EDITABLE_PAGES из settings"

    def handle(self, *args, **options):
        default_pages = []
        for page_name in settings.DEFAULT_EDITABLE_PAGES:
            default_pages.append(EditablePage(text="Пусто", page=page_name))

        EditablePage.objects.bulk_create(default_pages, ignore_conflicts=True)

        self.stdout.write(
            self.style.SUCCESS('Синхронизация выполнена')
        )
