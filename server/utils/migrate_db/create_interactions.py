import json
import os
import random
import sys

import django

# if you are running this from inside docker
sys.path.append("/usr/src/app")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "server.settings")
django.setup()

from api.models import (
    Comment,
    CommentInteraction,
    Playlist,
    PlaylistInteraction,
    User,
)

with open("comments_data.json", "r") as f:
    comments_data = json.load(f)

users = User.objects.all()
playlists = Playlist.objects.all()

# -----------------------------------------------------------------------------


def create_comment_interactions(playlist, user, isLiked):
    comment_text = (
        random.choice(comments_data["positive"])
        if isLiked
        else random.choice(comments_data["negative"])
    )
    comment = Comment.objects.create(
        userId=user, playlistId=playlist, text=comment_text
    )
    options = [0, 1, 2]
    probabilities = [0.20, 0.60, 0.20]
    liked_dislikes = random.choices(options, probabilities)[0]

    if liked_dislikes == 0:
        return

    # Exclude the original user from the choices
    other_users = users.exclude(id=user.id)
    other_user = random.choice(list(other_users))

    CommentInteraction.objects.create(
        isLiked=liked_dislikes == 1,
        isDisliked=liked_dislikes == 2,
        userId=other_user,
        commentId=comment,
    )
    comment.likes += 1 if liked_dislikes == 1 else 0
    comment.dislikes += 1 if liked_dislikes == 2 else 0
    comment.save()
    reply_text = (
        comments_data["replies_agree"]
        if liked_dislikes == 1
        else comments_data["replies_disagree"]
    )
    Comment.objects.create(
        userId=other_user,
        playlistId=playlist,
        text=random.choice(reply_text),
        commentId=comment,
    )


# -----------------------------------------------------------------------------


def create_playlist_interactions():
    for playlist in playlists:
        for user in users:
            options = [0, 1, 2, 3]
            probabilities = [0.05, 0.30, 0.05, 0.60]
            liked_dislikes_skip = random.choices(options, probabilities)[0]

            if liked_dislikes_skip == 0:
                continue

            PlaylistInteraction.objects.create(
                isLiked=liked_dislikes_skip == 1,
                isDisliked=liked_dislikes_skip == 2,
                userId=user,
                playlistId=playlist,
            )
            playlist.views += 1
            playlist.likes += 1 if liked_dislikes_skip == 1 else 0
            playlist.dislikes += 1 if liked_dislikes_skip == 2 else 0
            playlist.save()

            if liked_dislikes_skip == 1:
                create_comment_interactions(playlist, user, True)
            if liked_dislikes_skip == 2:
                create_comment_interactions(playlist, user, False)


# -----------------------------------------------------------------------------


def main():
    create_playlist_interactions()


if __name__ == "__main__":
    main()
