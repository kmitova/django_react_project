# Generated by Django 4.1.5 on 2023-02-06 14:23

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('api_books', '0004_wanttoread'),
    ]

    operations = [
        migrations.CreateModel(
            name='CurrentlyReading',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('currently_reading', models.BooleanField(default=False)),
                ('book', models.ForeignKey(on_delete=django.db.models.deletion.RESTRICT, to='api_books.book')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.RESTRICT, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
