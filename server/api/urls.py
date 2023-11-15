from django.urls import path, include, re_path
from django.views.generic import TemplateView
urlpatterns = [
    path('user/', include('api.user.urls')),
    path('playlist/', include('api.playlist.urls')),
    path('video/', include('api.video.urls')),
    path('comment/', include('api.comment.urls')),
    path('playlist-interaction/', include('api.playlistInteraction.urls')),
    path('comment-interaction/', include('api.commentInteraction.urls')),
    path('video-order/', include('api.videoOrder.urls')),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
]

urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name='index.html'))]