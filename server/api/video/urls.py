from django.urls import path
from . import views

urlpatterns = [
    path('<int:playlistId>/', views.video_detail, name='video_detail')
]
