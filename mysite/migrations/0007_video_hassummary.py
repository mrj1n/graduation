# Generated by Django 2.0.2 on 2018-04-01 16:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mysite', '0006_object_camera_id'),
    ]

    operations = [
        migrations.AddField(
            model_name='video',
            name='hasSummary',
            field=models.CharField(default=0, max_length=1),
        ),
    ]
