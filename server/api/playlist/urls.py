from django.urls import path
from . import views

urlpatterns = [
    path('', views.playlist, name='playlist'),
    path('<int:pk>/', views.playlist_detail, name='playlist_detail'),
    path('recommended/',views.recommended, name='recommended'),
    path('popular/', views.playlist, name='playlist'),
    path('recent-uploads/', views.recent_uploads, name='recent_uploads'),
    path('create-playlist/',views.create_playlist,name= 'create_playlist'),
    path('upload-pdf/',views.upload_pdf,name= 'upload_pdf')
]
