from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from api.user.views import (
    ActivateAccountView,
    GoogleLoginView,
    MyTokenObtainPairView,
    RegisterView,
    user,
)

urlpatterns = [
    path("", user, name="user"),
    path("register/", RegisterView.as_view(), name="register"),
    path("token/", MyTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path(
        "activate/<uidb64>/<token>/",
        ActivateAccountView.as_view(),
        name="activate",
    ),
    path("google-login/", GoogleLoginView.as_view(), name="google-login"),
]
