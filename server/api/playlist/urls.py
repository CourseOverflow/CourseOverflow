from django.urls import path
from . import views

urlpatterns = [
    path('', views.playlist, name='playlist'),
    path('<int:pk>/', views.playlist_detail, name='playlist_detail')
]
