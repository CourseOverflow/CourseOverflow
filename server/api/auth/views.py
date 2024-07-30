import os
from datetime import datetime

from django.conf import settings
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import EmailMultiAlternatives
from django.middleware.csrf import get_token
from django.template.loader import render_to_string
from django.utils.encoding import force_bytes, force_str
from django.utils.html import strip_tags
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from google.auth.transport import requests
from google.oauth2 import id_token
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from api.models import User
from api.serializers import (
    GoogleTokenObtainSerializer,
    MyTokenObtainPairSerializer,
    MyTokenRefreshSerializer,
    UserSerializer,
)

# ----------------------------------------------------------------------------


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

    def finalize_response(self, request, response, *args, **kwargs):
        try:
            response.set_cookie(
                "refresh",
                response.data.pop("refresh"),
                max_age=3600 * 24 * 14,
                httponly=True,
                samesite="Strict",
                secure=not settings.DEBUG,
            )
            return super().finalize_response(
                request, response, *args, **kwargs
            )
        except Exception:
            return super().finalize_response(
                request, response, *args, **kwargs
            )


# ----------------------------------------------------------------------------


class MyTokenRefreshView(TokenRefreshView):
    serializer_class = MyTokenRefreshSerializer

    def finalize_response(self, request, response, *args, **kwargs):
        try:
            response.set_cookie(
                "refresh",
                response.data.pop("refresh"),
                max_age=3600 * 24 * 14,
                httponly=True,
                samesite="Strict",
                secure=not settings.DEBUG,
            )
            return super().finalize_response(
                request, response, *args, **kwargs
            )
        except Exception:
            return super().finalize_response(
                request, response, *args, **kwargs
            )


# ----------------------------------------------------------------------------


@api_view(["GET"])
@permission_classes([AllowAny])
def get_csrf_token(request):
    try:
        csrf_token = get_token(request)
        response = Response(
            {"csrfToken": csrf_token}, status=status.HTTP_200_OK
        )
        response.set_cookie(
            "csrfToken",
            csrf_token,
            max_age=3600 * 24 * 14,
            httponly=True,
            samesite="Strict",
            secure=not settings.DEBUG,
        )
        return response
    except Exception:
        return Response(
            {"error": "Failed to get CSRF token"},
            status=status.HTTP_400_BAD_REQUEST,
        )


# ----------------------------------------------------------------------------


@api_view(["POST"])
@permission_classes([AllowAny])
def register_view(request):
    serializer = UserSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    email = serializer.validated_data.get("email")

    existing_user = User.objects.filter(email=email).first()

    if existing_user:
        if not existing_user.is_active:
            mail_subject = "Activate your account."
            uid = urlsafe_base64_encode(force_bytes(existing_user.pk))
            token = default_token_generator.make_token(existing_user)
            activation_link = f"{settings.DOMAIN}/activate/{uid}/{token}"

            html_message = render_to_string(
                "account_activation_email.html",
                {
                    "user": existing_user,
                    "activation_link": activation_link,
                    "current_year": datetime.now().year,
                },
            )
            plain_message = strip_tags(html_message)

            email = EmailMultiAlternatives(
                subject=mail_subject,
                body=plain_message,
                from_email="courseoverflow.in@gmail.com",
                to=[existing_user.email],
            )
            email.attach_alternative(html_message, "text/html")
            email.send(fail_silently=False)

            raise ValidationError(
                "A verification email has been sent to the provided email "
                + "address. Please check your inbox."
            )

        raise ValidationError("A user with this email already exists.")

    user = serializer.save()
    user.is_active = False
    user.save()

    mail_subject = "Activate your account."
    uid = urlsafe_base64_encode(force_bytes(user.pk))
    token = default_token_generator.make_token(user)
    activation_link = f"{settings.DOMAIN}/activate/{uid}/{token}"

    html_message = render_to_string(
        "account_activation_email.html",
        {
            "user": user,
            "activation_link": activation_link,
            "current_year": datetime.now().year,
        },
    )
    plain_message = strip_tags(html_message)

    email = EmailMultiAlternatives(
        subject=mail_subject,
        body=plain_message,
        from_email="courseoverflow.in@gmail.com",
        to=[user.email],
    )
    email.attach_alternative(html_message, "text/html")
    email.send(fail_silently=False)

    return Response(
        {"message": "Account created successfully"},
        status=status.HTTP_201_CREATED,
    )


# ----------------------------------------------------------------------------


@api_view(["GET"])
@permission_classes([AllowAny])
def activate_account_view(request, uidb64, token):
    try:
        uid = force_str(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)
        default_token_generator.check_token(user, token)
        user.is_active = True
        user.save()
        return Response(
            {"message": "Email verified successfully!"},
            status=status.HTTP_200_OK,
        )
    except Exception:
        return Response(
            {"error": "Invalid token"}, status=status.HTTP_400_BAD_REQUEST
        )


# ----------------------------------------------------------------------------


@api_view(["POST"])
@permission_classes([AllowAny])
def google_login_view(request):
    try:
        token = request.data.get("tokenId")
        id_info = id_token.verify_oauth2_token(
            token,
            requests.Request(),
            os.environ.get("GOOGLE_CLIENT_ID"),
        )
        if id_info["iss"] not in [
            "accounts.google.com",
            "https://accounts.google.com",
        ]:
            raise ValueError("Wrong issuer.")

        email = id_info["email"]
        name = id_info["name"]

        user, created = User.objects.get_or_create(
            email=email,
            defaults={
                "username": email.split("@")[0],
                "first_name": name.split()[0],
                "last_name": name.split()[-1],
            },
        )

        serializer = GoogleTokenObtainSerializer(data={"email": email})
        serializer.is_valid(raise_exception=True)
        token_data = serializer.validated_data

        response = Response(token_data, status=status.HTTP_200_OK)
        response.set_cookie(
            "refresh",
            token_data.pop("refresh"),
            max_age=3600 * 24 * 14,
            httponly=True,
            samesite="Strict",
            secure=not settings.DEBUG,
        )
        return response

    except Exception:
        return Response(
            {"error": "Invalid token"},
            status=status.HTTP_400_BAD_REQUEST,
        )


# ----------------------------------------------------------------------------


@api_view(["POST"])
@permission_classes([AllowAny])
def password_reset_request(request):
    email = request.data.get("email")
    if not email:
        return Response(
            {"error": "Email is required"}, status=status.HTTP_400_BAD_REQUEST
        )

    user = User.objects.filter(email=email).first()
    if not user:
        return Response(
            {"error": "No user found with this email"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    token = default_token_generator.make_token(user)
    uid = urlsafe_base64_encode(force_bytes(user.pk))
    mail_subject = "Password Reset Request"
    reset_link = f"{settings.DOMAIN}/reset-password/{uid}/{token}"

    html_message = render_to_string(
        "password_reset_email.html",
        {
            "user": user,
            "reset_link": reset_link,
            "current_year": datetime.now().year,
        },
    )

    plain_message = strip_tags(html_message)

    email = EmailMultiAlternatives(
        subject=mail_subject,
        body=plain_message,
        from_email="courseoverflow.in@gmail.com",
        to=[user.email],
    )
    email.attach_alternative(html_message, "text/html")
    email.send(fail_silently=False)

    return Response(
        {"message": "If the email is valid, a reset link will be sent."},
        status=status.HTTP_200_OK,
    )


# ----------------------------------------------------------------------------


@api_view(["POST"])
@permission_classes([AllowAny])
def password_reset_confirm(request, uidb64, token):
    new_password = request.data.get("new_password")
    new_password_confirm = request.data.get("new_password_confirm")

    if new_password != new_password_confirm:
        return Response(
            {"error": "Passwords do not match"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    try:
        uid = force_str(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)
    except (TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None

    if user and default_token_generator.check_token(user, token):
        user.set_password(new_password)
        user.save()
        return Response(
            {"message": "Password has been reset successfully"},
            status=status.HTTP_200_OK,
        )
    else:
        return Response(
            {"error": "Invalid token or user ID"},
            status=status.HTTP_400_BAD_REQUEST,
        )


# ----------------------------------------------------------------------------


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def user_view(request):
    users = User.objects.all()[:5]
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


# ----------------------------------------------------------------------------


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def logoutUser(request):
    response = Response(
        {"message": "Logout successful"}, status=status.HTTP_200_OK
    )
    response.delete_cookie("refresh")
    return response


# ----------------------------------------------------------------------------
