from django.urls import path
from . import views

urlpatterns = [
    path('<int:userId>/<int:playlistId>/',
         views.commentSection, name='commentSection'),
    path('post/', views.postComment, name='postComment'),
    path('updateComment/likeDislike/',
         views.likeDislikeComment, name='likeDislikeComment'),
]
