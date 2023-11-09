from django.db import models


class User(models.Model):
    googleId = models.CharField(max_length=255, blank=True, null=True)
    username = models.CharField(max_length=255)
    email = models.EmailField()
    password = models.CharField(max_length=255)
    profilePicture = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)

    def save(self, *args, **kwargs):
        if not self.profilePicture and self.username:
            self.profilePicture = f"https://via.placeholder.com/150?text={self.username[0]}"
        super().save(*args, **kwargs)

    def __str__(self):
        return self.username


class Playlist(models.Model):
    title = models.CharField(max_length=255)
    desc = models.TextField(blank=True, null=True)
    thumbnail = models.TextField(blank=True, null=True)
    likes = models.IntegerField(default=0)
    dislikes = models.IntegerField(default=0)
    duration = models.DurationField(default=0)
    views = models.IntegerField(default=0)
    bundleSize = models.IntegerField(default=0)
    coursePDF = models.TextField(blank=True, null=True)
    authorId = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)

    def save(self, *args, **kwargs):
        if not self.thumbnail and self.title:
            self.thumbnail = f"https://via.placeholder.com/150?text={self.title}"
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title


class PlaylistInteraction(models.Model):
    isLiked = models.BooleanField(default=False)
    isDisliked = models.BooleanField(default=False)
    isBookmarked = models.BooleanField(default=False)
    watchCount = models.IntegerField(default=0)
    playlistId = models.ForeignKey(Playlist, on_delete=models.CASCADE)
    userId = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)


    def __str__(self):
        reaction = ""
        if self.isLiked:
            reaction += "liked"
        elif self.isDisliked:
            reaction += "disliked"

        if self.isBookmarked:
            reaction += " bookmarked"

        return reaction

    class Meta:
        unique_together = ('userId', 'playlistId')


class Video(models.Model):
    title = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    thumbnail = models.TextField()
    duration = models.DurationField()
    youtubeHash = models.CharField(max_length=255)
    likes = models.IntegerField()
    dislikes = models.IntegerField()
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)

    def __str__(self):
        return self.title


class VideoOrder(models.Model):
    index = models.IntegerField(default=0)
    playlistId = models.ForeignKey(Playlist, on_delete=models.CASCADE)
    videoId = models.ForeignKey(Video, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)

    def __str__(self):
        return f"{self.playlistId.title}: {self.index}"


class Comment(models.Model):
    text = models.TextField()
    likes = models.IntegerField(default=0)
    dislikes = models.IntegerField(default=0)
    userId = models.ForeignKey(User, on_delete=models.CASCADE)
    playlistId = models.ForeignKey(Playlist, on_delete=models.CASCADE)
    commentId = models.ForeignKey(
        'self', on_delete=models.CASCADE, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)

    def __str__(self):
        return self.text[:100]


class CommentInteraction(models.Model):
    isLiked = models.BooleanField(default=False)
    isDisliked = models.BooleanField(default=False)
    userId = models.ForeignKey(User, on_delete=models.CASCADE)
    commentId = models.ForeignKey(Comment, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)

    def __str__(self):
        if self.isLiked:
            return "liked"
        elif self.isDisliked:
            return "disliked"
        else:
            return "error"
