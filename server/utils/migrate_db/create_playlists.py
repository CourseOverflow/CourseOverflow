import asyncio
import json
import os
import random
import sys
from datetime import datetime, timedelta

import django

current_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.dirname(current_dir)
sys.path.append(parent_dir)

from youtubeAPI import generate_ythash_playlist

sys.path.append("/usr/src/app")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "server.settings")
django.setup()

from api.models import Playlist, User, Video, VideoOrder

# -----------------------------------------------------------------------------


def parse_duration(duration_str):
    time_parts = duration_str.split(":")
    hours, minutes, seconds = (
        int(time_parts[0]),
        int(time_parts[1]),
        int(time_parts[2]),
    )
    return timedelta(hours=hours, minutes=minutes, seconds=seconds)


# -----------------------------------------------------------------------------


def create_playlists(playlists):
    users = User.objects.all()
    for playlist in playlists:
        user = random.choice(users)
        video_ids = playlist["videos"]
        videos = asyncio.run(generate_ythash_playlist(video_ids))
        total_duration = timedelta(seconds=0)

        created_playlist = Playlist.objects.create(
            title=playlist["title"],
            desc="",
            thumbnail=playlist["thumbnail"],
            authorId=user,
            duration=total_duration,
        )

        for idx, video in enumerate(videos):
            del video["selected"]
            video["youtubeHash"] = video.pop("video_id")
            video["duration"] = parse_duration(video["duration"])
            total_duration += video["duration"]
            created_video = Video.objects.create(**video)
            VideoOrder.objects.create(
                playlistId=created_playlist, videoId=created_video, index=idx
            )

        created_playlist.duration = total_duration
        created_playlist.save()


# -----------------------------------------------------------------------------


def main():
    with open("playlist_data.json", "r") as f:
        playlists = json.load(f).get("playlists")
    create_playlists(playlists)


if __name__ == "__main__":
    main()
