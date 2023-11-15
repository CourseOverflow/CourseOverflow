from django.urls import path
from . import views

urlpatterns = [
    path('<int:userId>/<int:playlistId>/',
         views.getPlaylist, name='getPlaylist'),
    path('recommended/', views.recommended, name='recommended'),
    path('popular/', views.popular, name='popular'),
    path('recent-uploads/', views.recent_uploads, name='recent_uploads'),
    path('watched/<int:userId>/<int:playlistId>/',
         views.watched, name='watched'),
    path('setLastWatched/', views.setLastWatched, name='setLastWatched'),
    path('updateWatched/', views.updateWatched, name='updateWatched'),
    path('updateLikeDislike/', views.updateLikeDislike, name='updateLikeDislike'),
    path('create-playlist/', views.create_playlist, name='create_playlist')
]
