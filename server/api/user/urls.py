from django.urls import path

from . import views

urlpatterns = [
    path("update-user-profile", views.update_user_profile, name="update-user-profile"),
    path("<str:username>", views.get_user, name="get-user"),
]
