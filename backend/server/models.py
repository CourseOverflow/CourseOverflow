from django.db import models


class User(models.Model):
    googleId = models.CharField(max_length=255)
    username = models.CharField(max_length=255)
    email = models.EmailField()
    password = models.CharField(max_length=255)
    profilePicture = models.ImageField(upload_to='profile_pictures/')


class Playlist(models.Model):
    title = models.CharField(max_length=255)
    desc = models.TextField()
    thumbnail = models.ImageField(upload_to='playlist_thumbnails/')
    likes = models.IntegerField()
    dislikes = models.IntegerField()
    duration = models.DurationField()
    views = models.IntegerField()
    bundleSize = models.IntegerField()
    coursePDF = models.FileField(upload_to='course_pdfs/')
    authorId = models.ForeignKey(User, on_delete=models.CASCADE)


class PlaylistInteraction(models.Model):
    isLiked = models.BooleanField()
    isDisliked = models.BooleanField()
    isBookmarked = models.BooleanField()
    watchCount = models.IntegerField()
    playlistId = models.ForeignKey(Playlist, on_delete=models.CASCADE)
    userId = models.ForeignKey(User, on_delete=models.CASCADE)


class Video(models.Model):
    title = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    thumbnail = models.ImageField(upload_to='video_thumbnails/')
    duration = models.DurationField()
    youtubeHash = models.CharField(max_length=255)
    likes = models.IntegerField()
    dislikes = models.IntegerField()
    description = models.TextField()


class VideoOrder(models.Model):
    index = models.IntegerField()
    playlistId = models.ForeignKey(Playlist, on_delete=models.CASCADE)
    videoId = models.ForeignKey(Video, on_delete=models.CASCADE)


class Comment(models.Model):
    text = models.TextField()
    likes = models.IntegerField()
    dislikes = models.IntegerField()
    userId = models.ForeignKey(User, on_delete=models.CASCADE)
    playlistId = models.ForeignKey(Playlist, on_delete=models.CASCADE)
    commentId = models.ForeignKey('self', on_delete=models.CASCADE, null=True)


class CommentInteraction(models.Model):
    isLiked = models.BooleanField()
    isDisliked = models.BooleanField()
    userId = models.ForeignKey(User, on_delete=models.CASCADE)
    commentId = models.ForeignKey(Comment, on_delete=models.CASCADE)
