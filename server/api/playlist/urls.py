from django.urls import path
from . import views

urlpatterns = [
    path('<int:pk>/', views.playlist_detail, name='playlist_detail'),
    path('recommended/', views.recommended, name='recommended'),
    path('popular/', views.popular, name='popular'),
    path('recent-uploads/', views.recent_uploads, name='recent_uploads'),
    path('watched/<int:userId>/<int:playlistId>/',
         views.watched, name='watched'),
    path('setLastWatched/<int:userId>/<int:playlistId>/',
         views.setLastWatched, name='setLastWatched'),
    path('updateWatched/add/<int:userId>/<int:playlistId>/<int:index>/',
         views.addWatched, name='addWatched'),
    path('updateWatched/delete/<int:userId>/<int:playlistId>/<int:index>/',
         views.deleteWatched, name='deleteWatched'),
]
