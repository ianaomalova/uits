# Generated by Django 4.2.5 on 2024-05-25 18:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('editable_pages', '0007_alter_editablepage_text'),
    ]

    operations = [
        migrations.AddField(
            model_name='editablepage',
            name='title',
            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='Название страницы (для отображения в админ-панели)'),
        ),
    ]
