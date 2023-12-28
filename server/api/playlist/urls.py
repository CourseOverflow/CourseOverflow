from django.urls import path
from . import views

urlpatterns = [
    path('<int:userId>/<int:playlistId>/',
         views.getPlaylist, name='getPlaylist'),
    path('recommended/', views.recommended, name='recommended'),
    path('popular/', views.popular, name='popular'),
    path('recent-uploads/', views.recent_uploads, name='recent_uploads'),
    path('user-playlists/', views.user_playlists, name='user_playlists'),
    path('user-liked-playlists/', views.user_liked_playlists,
         name='user_liked_playlists'),
    path('user-bookmarked-playlists/', views.user_bookmarked_playlists,
         name='user_bookmarked_playlists'),
    path('watch-count/<int:userId>/<int:playlistId>/',
         views.watch_count, name='watch_count'),
    path('getLastWatched/', views.getLastWatched, name='getLastWatched'),
    path('setLastWatched/', views.setLastWatched, name='setLastWatched'),
    path('updateWatched/', views.updateWatched, name='updateWatched'),
    path('updateLikeDislike/', views.updateLikeDislike, name='updateLikeDislike'),
    path('create-playlist/', views.create_playlist, name='create_playlist'),
]
