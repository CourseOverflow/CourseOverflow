from django.contrib import admin
from .models import User, Playlist, PlaylistInteraction, Video, VideoOrder, Comment, CommentInteraction

admin.site.register(User)
admin.site.register(Playlist)
admin.site.register(PlaylistInteraction)
admin.site.register(Video)
admin.site.register(VideoOrder)
admin.site.register(Comment)
admin.site.register(CommentInteraction)
