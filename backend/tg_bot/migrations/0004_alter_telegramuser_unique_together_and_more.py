# Generated by Django 4.2.5 on 2024-05-12 16:56

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('tg_bot', '0003_telegramuser_assigned_user'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='telegramuser',
            unique_together=set(),
        ),
        migrations.AlterField(
            model_name='telegramuser',
            name='assigned_user',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='telegram_user', to=settings.AUTH_USER_MODEL),
        ),
    ]