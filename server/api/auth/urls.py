from api.auth.views import (
    MyTokenObtainPairView,
    MyTokenRefreshView,
    activate_account_view,
    get_csrf_token,
    google_login_view,
    logoutUser,
    password_reset_confirm,
    password_reset_request,
    register_view,
    user_view,
)
from django.urls import path

urlpatterns = [
    path("", user_view, name="user"),
    path("token/", MyTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", MyTokenRefreshView.as_view(), name="token_refresh"),
    path("token/csrf/", get_csrf_token, name="token-csrf"),
    path("register/", register_view, name="register"),
    path("activate/<uidb64>/<token>/", activate_account_view, name="activate"),
    path("google-login/", google_login_view, name="google-login"),
    path("reset-password/", password_reset_request, name="reset-password"),
    path(
        "reset-password-confirm/<uidb64>/<token>/",
        password_reset_confirm,
        name="reset-password-confirm",
    ),
    path("logout/", logoutUser, name="logout"),
]
