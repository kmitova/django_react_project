# Generated by Django 4.1.5 on 2023-02-18 11:22

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api_books', '0009_alter_customshelfstatus_book_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customshelfstatus',
            name='shelf',
            field=models.ForeignKey(on_delete=django.db.models.deletion.RESTRICT, related_name='shelf', to='api_books.shelf'),
        ),
    ]
