# Generated by Django 2.0.2 on 2018-04-02 03:13

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('mysite', '0008_auto_20180402_1108'),
    ]

    operations = [
        migrations.RenameField(
            model_name='object',
            old_name='camera_id',
            new_name='camera',
        ),
    ]
