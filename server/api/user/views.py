from datetime import datetime

from django.contrib.auth import get_user_model
from django.contrib.auth.tokens import default_token_generator
from django.contrib.sites.shortcuts import get_current_site
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.urls import reverse
from django.utils.encoding import force_bytes, force_str
from django.utils.html import strip_tags
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from google.auth.transport import requests
from google.oauth2 import id_token
from rest_framework import generics, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK
from rest_framework.views import APIView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView

from api.models import User
from api.serializers import UserSerializer


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = UserSerializer

    def perform_create(self, serializer):
        email = serializer.validated_data.get("email")

        existing_user = User.objects.filter(email=email).first()

        if existing_user:
            if not existing_user.is_active:
                # Optionally resend the activation email
                current_site = get_current_site(self.request)
                mail_subject = "Activate your account."
                uid = urlsafe_base64_encode(force_bytes(existing_user.pk))
                token = default_token_generator.make_token(existing_user)
                activation_link = f"http://{current_site.domain}{reverse('activate', kwargs={'uidb64': uid, 'token': token})}"

                html_message = render_to_string(
                    "account_activation_email.html",
                    {
                        "user": existing_user,
                        "domain": current_site.domain,
                        "uid": uid,
                        "token": token,
                        "activation_link": activation_link,
                        "current_year": datetime.datetime.now().year,
                    },
                )
                plain_message = strip_tags(html_message)

                email = EmailMultiAlternatives(
                    subject=mail_subject,
                    body=plain_message,
                    from_email="noreply@courseoverflow.in",
                    to=[existing_user.email],
                )
                email.attach_alternative(html_message, "text/html")
                email.send(fail_silently=False)

                raise ValidationError(
                    "A verification email has been sent to the provided email address. Please check your inbox."
                )

            # If the user is already active, no need to create a new user
            raise ValidationError("A user with this email already exists.")

        # If no unverified user exists, create a new user
        user = serializer.save()
        user.is_active = False
        user.save()

        # Send activation email as usual
        current_site = get_current_site(self.request)
        mail_subject = "Activate your account."
        uid = urlsafe_base64_encode(force_bytes(user.pk))
        token = default_token_generator.make_token(user)
        activation_link = f"http://{current_site.domain}{reverse('activate', kwargs={'uidb64': uid, 'token': token})}"

        html_message = render_to_string(
            "account_activation_email.html",
            {
                "user": user,
                "domain": current_site.domain,
                "uid": uid,
                "token": token,
                "activation_link": activation_link,
                "current_year": datetime.now().year,
            },
        )
        plain_message = strip_tags(html_message)

        email = EmailMultiAlternatives(
            subject=mail_subject,
            body=plain_message,
            from_email="noreply@courseoverflow.in",
            to=[user.email],
        )
        email.attach_alternative(html_message, "text/html")
        email.send(fail_silently=False)


class ActivateAccountView(APIView):
    def get(self, request, uidb64, token):
        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            user = None

        if user is not None and default_token_generator.check_token(
            user, token
        ):
            user.is_active = True
            user.save()
            return Response(
                {"message": "Email verified successfully!"},
                status=status.HTTP_200_OK,
            )
        else:
            return Response(
                {"error": "Invalid token"}, status=status.HTTP_400_BAD_REQUEST
            )


class GoogleLoginView(APIView):
    permission_classes = (AllowAny,)

    def post(self, request, *args, **kwargs):
        token = request.data.get("tokenId")
        try:
            # Verify the token
            id_info = id_token.verify_oauth2_token(
                token,
                requests.Request(),
                "492813304799-ukoph11jr2b8hminsttti3nerl5ul721.apps.googleusercontent.com",
            )
            if id_info["iss"] not in [
                "accounts.google.com",
                "https://accounts.google.com",
            ]:
                raise ValueError("Wrong issuer.")

            email = id_info["email"]
            name = id_info["name"]
            profile_pic = id_info["picture"]

            # Check if user exists, if not create a new user
            user, created = User.objects.get_or_create(
                email=email,
                defaults={
                    "username": email.split("@")[0],
                    "first_name": name.split()[0],
                    "last_name": name.split()[-1],
                    "profile_pic": profile_pic,
                },
            )

            # Generate JWT tokens
            refresh = RefreshToken.for_user(user)
            return Response(
                {
                    "refresh": str(refresh),
                    "access": str(refresh.access_token),
                }
            )

        except ValueError as e:
            return Response(
                {"error": str(e)}, status=status.HTTP_400_BAD_REQUEST
            )


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token["email"] = user.email
        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def user(request):
    users = User.objects.all()[:5]
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data, status=HTTP_200_OK)
