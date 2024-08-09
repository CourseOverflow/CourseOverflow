from django.urls import path

from . import views

urlpatterns = [
    path("get-playlist", views.getPlaylist, name="getPlaylist"),
    path("search", views.search, name="search"),
    path("recommended", views.recommended, name="recommended"),
    path("popular", views.popular, name="popular"),
    path("recent-uploads", views.recent_uploads, name="recent_uploads"),
    path("user-playlists", views.user_playlists, name="user_playlists"),
    path(
        "user-liked-playlists",
        views.user_liked_playlists,
        name="user_liked_playlists",
    ),
    path(
        "user-bookmarked-playlists",
        views.user_bookmarked_playlists,
        name="user_bookmarked_playlists",
    ),
    path("watch-count", views.watch_count, name="watch_count"),
    path("get-last-watched", views.getLastWatched, name="getLastWatched"),
    path("set-last-watched", views.setLastWatched, name="setLastWatched"),
    path("update-watched", views.updateWatched, name="updateWatched"),
    path(
        "update-like-dislike",
        views.updateLikeDislike,
        name="updateLikeDislike",
    ),
    path("create-playlist", views.create_playlist, name="create_playlist"),
]
