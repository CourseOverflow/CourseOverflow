from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from .views import (
    MyTokenObtainPairView,
    activate_account_view,
    google_login_view,
    password_reset_confirm,
    password_reset_request,
    register_view,
    user_view,
)

urlpatterns = [
    path("", user_view, name="user"),
    path("register/", register_view, name="register"),
    path("token/", MyTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("activate/<uidb64>/<token>/", activate_account_view, name="activate"),
    path("google-login/", google_login_view, name="google-login"),
    path("reset-password/", password_reset_request, name="reset-password"),
    path(
        "reset-password-confirm/<uidb64>/<token>/",
        password_reset_confirm,
        name="reset-password-confirm",
    ),
]
