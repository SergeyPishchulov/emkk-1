# Generated by Django 3.2.8 on 2021-10-13 14:53

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('emkk_site', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name='trip',
            name='leader',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='review',
            name='reviewer',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='review',
            name='trip',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='emkk_site.trip'),
        ),
        migrations.AddField(
            model_name='document',
            name='trip',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='emkk_site.trip'),
        ),
    ]
