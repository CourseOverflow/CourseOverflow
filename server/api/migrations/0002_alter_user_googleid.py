# Generated by Django 4.2.6 on 2023-11-08 18:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='googleId',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
