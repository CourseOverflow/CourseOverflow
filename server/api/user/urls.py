from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from api.user.views import MyTokenObtainPairView, RegisterView, user

urlpatterns = [
    path("", user, name="user"),
    path("register/", RegisterView.as_view(), name="register"),
    path("token/", MyTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
]
