# Generated by Django 4.2.7 on 2023-11-09 12:11

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_comment_created_at_commentinteraction_created_at_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='comment',
            name='created_at',
        ),
        migrations.RemoveField(
            model_name='commentinteraction',
            name='created_at',
        ),
        migrations.RemoveField(
            model_name='playlistinteraction',
            name='created_at',
        ),
        migrations.RemoveField(
            model_name='user',
            name='created_at',
        ),
        migrations.RemoveField(
            model_name='video',
            name='created_at',
        ),
        migrations.RemoveField(
            model_name='videoorder',
            name='created_at',
        ),
    ]