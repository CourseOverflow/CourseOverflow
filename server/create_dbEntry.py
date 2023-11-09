python3 manage.py shell < create_dbEntry.py


import os
import django
from api.models import User
import random

# Set the DJANGO_SETTINGS_MODULE environment variable
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "server.settings")
django.setup()

# Rest of your code to create and save user entries
# ...

# List of random names
random_names = [
    "Jon", "Jane", "Alice", "Bob", "Charlie", "David", "Eve", "Frank", "Grace",
    "Hank", "Ivy", "Jack", "Katie", "Liam", "Mia", "Noah", "Olivia", "Peter", "Quinn", "Rachel",
    "Sophia", "Thomas", "Victoria", "William", "Xander", "Yara", "Zane", "Emma", "Henry", "Isabella",
    "Jacob", "Katherine", "Luke", "Madison", "Nathan", "Oliver", "Penelope", "Quincy", "Rose", "Samuel",
    "Sophie", "Theodore", "Uma", "Vincent", "Violet", "Winston", "Xena", "Yannick", "Zara", "Aaron",
    "Amelia", "Benjamin", "Catherine", "Daniel", "Ella", "Finn", "Gabriella", "Hudson", "Isabel", "James",
    "Jasmine", "Kevin", "Lily", "Mason", "Nora", "Oscar", "Olivia", "Parker", "Quinn", "Riley", "Sofia",
    "Tobias", "Ava", "Ulysses", "Vivian", "William", "Ximena", "Yusuf", "Zoey", "Arthur", "Bella", "Carlos",
    "Chloe", "Dylan", "Eva", "Felix", "Grace", "Hannah", "Isaac", "Julia", "Kai", "Luna", "Matthew", "Natalie",
    "Owen", "Sophia", "Patrick", "Zoe"
]

# Loop to create and save 20 users with random names
for i in range(100):
    # Generate a random index to pick a name
    random_name = random.choice(random_names)

    # Create a new User instance
    new_user = User(
        googleId=i+1,
        username=random_name.lower(),  # Using lowercase of the random name as username
        email=f'{random_name.lower()}@example.com',
        password='1234',
    )

    # Save the user to the database
    new_user.save()





import os
import django
from api.models import User, Playlist
import random
from datetime import timedelta

# Set the DJANGO_SETTINGS_MODULE environment variable
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "server.settings")
django.setup()
random_names = [
    "Jon", "Jane", "Alice", "Bob", "Charlie", "David", "Eve", "Frank", "Grace",
    "Hank", "Ivy", "Jack", "Katie", "Liam", "Mia", "Noah", "Olivia", "Peter", "Quinn", "Rachel",
    "Sophia", "Thomas", "Victoria", "William", "Xander", "Yara", "Zane", "Emma", "Henry", "Isabella",
    "Jacob", "Katherine", "Luke", "Madison", "Nathan", "Oliver", "Penelope", "Quincy", "Rose", "Samuel",
    "Sophie", "Theodore", "Uma", "Vincent", "Violet", "Winston", "Xena", "Yannick", "Zara", "Aaron",
    "Amelia", "Benjamin", "Catherine", "Daniel", "Ella", "Finn", "Gabriella", "Hudson", "Isabel", "James",
    "Jasmine", "Kevin", "Lily", "Mason", "Nora", "Oscar", "Olivia", "Parker", "Quinn", "Riley", "Sofia",
    "Tobias", "Ava", "Ulysses", "Vivian", "William", "Ximena", "Yusuf", "Zoey", "Arthur", "Bella", "Carlos",
    "Chloe", "Dylan", "Eva", "Felix", "Grace", "Hannah", "Isaac", "Julia", "Kai", "Luna", "Matthew", "Natalie",
    "Owen", "Sophia", "Patrick", "Zoe"
]
# Loop to create and save 10 different playlists with random details
for i in range(20):
    # Get a random user as the author
    author_user = User.objects.get(googleId=random.randint(1, 100))

    # Create a new Playlist instance with a random duration in timedelta format
    # Random duration between 1 to 24 hours (in seconds)
    duration_seconds = random.randint(3600, 86400)
    duration_timedelta = timedelta(seconds=duration_seconds)

    new_playlist = Playlist(
        title=f'Title {i + 1}',
        desc=f'Description of Playlist {i + 1}',
        likes=random.randint(0, 1000),
        dislikes=random.randint(0, 100),
        duration=duration_timedelta,
        views=random.randint(0, 100000),
        bundleSize=random.randint(1, 100),
        authorId=author_user
    )

    # Save the playlist to the database
    new_playlist.save()






import os
import django
from api.models import Video
import random
from datetime import timedelta
# Set the DJANGO_SETTINGS_MODULE environment variable
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "server.settings")
django.setup()

# List of YouTube hashes
youtube_hashes = [
    "ukzFI9rgwfU",
    "Q9wXgdxJq48",
    "VS0BcOiKaGI",
    "RkEVbs4-W_s",
    "rrB13utjYV4",
    "5pvt7ag7E",
    "Gjnup-PuquQ",
    "ZzI9JE0i6Lc",
    "s2skans2dP4",
]

# Loop to create and save 500 different videos with random details
for i in range(80):
    # Get a random YouTube hash from the list
    youtube_hash = random.choice(youtube_hashes)
    duration_seconds = random.randint(300, 1200)
    duration_timedelta = timedelta(seconds=duration_seconds)

    # Create a new Video instance
    new_video = Video(
        title=f'Title {i + 1}',
        author=f'Author {i + 1}',
        thumbnail=f'Thumbnail URL {i + 1}',
        duration=duration_timedelta,
        youtubeHash=youtube_hash,
        likes=random.randint(0, 1000),
        dislikes=random.randint(0, 100),
        description=f'Description of Video {i + 1}',
    )

    # Save the video to the database









    import os
import django
from api.models import Playlist, PlaylistInteraction, User
import random

# Set the DJANGO_SETTINGS_MODULE environment variable
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "server.settings")
django.setup()

# Iterate through playlists with titles "Title 1" to "Title 20"
for i in range(1, 21):
    playlist = Playlist.objects.get(title=f"Title {i}")

    # Select 20 random users
    random_users = User.objects.order_by('?')[:20]

    # Randomly decide to like, dislike, and bookmark
    for user in random_users:
        interaction = PlaylistInteraction(
            playlistId=playlist,
            userId=user,
        )

        # Randomly decide to like (50% chance) or dislike (50% chance)
        if random.choice([True, False]):
            interaction.isLiked = True
        else:
            interaction.isDisliked = True

        # Randomly decide to bookmark (30% chance)
        if random.random() < 0.3:
            interaction.isBookmarked = True

        interaction.save()












    new_video.save(import os
import django
from api.models import Playlist, VideoOrder, Video
import random

# Set the DJANGO_SETTINGS_MODULE environment variable
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "server.settings")
django.setup()

# Iterate through playlists with titles "Title 1" to "Title 20"
for i in range(1, 21):
    playlist = Playlist.objects.get(title=f"Title {i}")

    # Select a random number of videos between 30 and 50
    num_selected_videos = random.randint(30, 50)
    selected_videos = Video.objects.order_by('?')[:num_selected_videos]

    # Add videos to the VideoOrder table with indexes starting from 0 to num_selected_videos - 1
    for index, video in enumerate(selected_videos):
        video_order = VideoOrder(
            playlistId=playlist,
            videoId=video,
            index=index  # Start the index from 0 and increment for each video
        )
        video_order.save()
)

import os
import django
from api.models import Comment, CommentInteraction, User
import random

# Set the DJANGO_SETTINGS_MODULE environment variable
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "server.settings")
django.setup()

# Get all comments from the Comment table
all_comments = Comment.objects.all()

# Iterate through comments
for comment in all_comments:
    # Randomly decide to add likes or dislikes (30% chance)
    if random.random() < 0.3:
        # Select a random number of users between 8 and 15
        num_users = random.randint(2, 8)
        selected_users = User.objects.order_by('?')[:num_users]

        for user in selected_users:
            interaction = CommentInteraction(
                commentId=comment,
                userId=user,
            )

            # Randomly decide to like (50% chance) or dislike (50% chance)
            if random.choice([True, False]):
                interaction.isLiked = True
            else:
                interaction.isDisliked = True

            interaction.save()
