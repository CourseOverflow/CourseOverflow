from django.urls import path
from . import views

urlpatterns = [
    path('<int:playlistId>/', views.commentSection, name='commentSection')
]
