from django.urls import path
from . import views

urlpatterns = [
    path('recommended/',views.recommended, name='recommended'),
    path('popular/', views.playlist, name='playlist'),
    path('recent-uploads/', views.recent_uploads, name='recent_uploads'),
]
