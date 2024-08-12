import json
import os
import sys

import django

# if you are running this from inside docker
sys.path.append("/usr/src/app")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "server.settings")
django.setup()

from api.models import User

# -----------------------------------------------------------------------------


def create_users(user_names):
    for user in user_names:
        first_name = user["name"].split()[0]
        last_name = user["name"].split()[1]
        email = f"{first_name.lower()}{last_name.lower()}@courseoverflow.com"
        profilePicture = user["profilePicture"]
        is_staff = False
        is_superuser = False
        is_active = True
        created_user = User.objects.create_user(
            first_name=first_name,
            last_name=last_name,
            email=email,
            profilePicture=profilePicture,
            is_staff=is_staff,
            is_superuser=is_superuser,
            is_active=is_active,
        )
        created_user.username = (
            first_name.capitalize()
            + last_name.capitalize()
            + str(created_user.id)
        )
        created_user.save()


# -----------------------------------------------------------------------------


def main():
    with open("users.json", "r") as f:
        user_names = json.load(f)
    create_users(user_names)


if __name__ == "__main__":
    main()
