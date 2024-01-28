from django.urls import path
from . import views

urlpatterns = [
    path('video-detail', views.video_detail, name='video_detail'),
]
