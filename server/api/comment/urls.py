from django.urls import path
from . import views

urlpatterns = [
    path('section', views.commentSection, name='commentSection'),
    path('post', views.postComment, name='postComment'),
    path('update-like-dislike', views.updateLikeDislike, name='updateLikeDislike'),
]
