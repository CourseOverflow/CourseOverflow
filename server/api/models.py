from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin,
)
from django.db import models
from django.utils import timezone

# ----------------------------------------------------------------------------


class UserAccountManager(BaseUserManager):
    def create_user(self, email, first_name, last_name, password=None, **extra_fields):
        if not email:
            raise ValueError("Users must have an email address")
        if not first_name:
            raise ValueError("Users must have a first name")
        if not last_name:
            raise ValueError("Users must have a last name")

        email = self.normalize_email(email)
        user = self.model(
            email=email,
            first_name=first_name,
            last_name=last_name,
            **extra_fields,
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(
        self, email, first_name, last_name, password=None, **extra_fields
    ):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self.create_user(email, first_name, last_name, password, **extra_fields)


# ----------------------------------------------------------------------------


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=255, unique=True)
    username = models.CharField(max_length=255, blank=True, null=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    profilePicture = models.TextField(blank=True, null=True)
    cloudinaryPublicId = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(
        default=timezone.now, null=True, blank=True, editable=False
    )

    objects = UserAccountManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["first_name", "last_name"]

    def save(self, *args, **kwargs):
        if not self.username:
            self.username = self.first_name.capitalize() + self.last_name.capitalize()

        if not self.profilePicture and self.first_name:
            self.profilePicture = (
                f"https://via.placeholder.com/150?text={self.first_name[0]}"
            )

        super().save(*args, **kwargs)

    def get_full_name(self):
        return f"{self.first_name} {self.last_name}"

    def get_short_name(self):
        return self.first_name

    def __str__(self):
        return self.email


# ----------------------------------------------------------------------------


class Draft(models.Model):
    title = models.CharField(max_length=255)
    desc = models.TextField(blank=True, null=True)
    thumbnail = models.TextField(blank=True, null=True)
    cloudinaryPublicId = models.TextField(blank=True, null=True)
    topicList = models.JSONField(default=list)
    videoList = models.JSONField(default=list)
    duration = models.DurationField(default=0)
    coursePDF = models.TextField(blank=True, null=True)
    authorId = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(default=timezone.now, null=True, blank=True)

    def __str__(self):
        return self.title


# ----------------------------------------------------------------------------


class Playlist(models.Model):
    title = models.CharField(max_length=255)
    desc = models.TextField(blank=True, null=True)
    thumbnail = models.TextField(blank=True, null=True)
    cloudinaryPublicId = models.TextField(blank=True, null=True)
    likes = models.IntegerField(default=0)
    dislikes = models.IntegerField(default=0)
    duration = models.DurationField(default=0)
    views = models.IntegerField(default=0)
    coursePDF = models.TextField(blank=True, null=True)
    authorId = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(default=timezone.now, null=True, blank=True)

    def __str__(self):
        return self.title


# ----------------------------------------------------------------------------


class PlaylistInteraction(models.Model):
    isLiked = models.BooleanField(default=False)
    isDisliked = models.BooleanField(default=False)
    isBookmarked = models.BooleanField(default=False)
    watched = models.JSONField(default=list)
    lastWatched = models.IntegerField(default=0)
    playlistId = models.ForeignKey(Playlist, on_delete=models.CASCADE)
    userId = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        reaction = f"User {self.userId_id} "
        if self.isLiked:
            reaction += "liked"
        elif self.isDisliked:
            reaction += "disliked"

        if self.isBookmarked:
            reaction += " bookmarked"

        return reaction

    class Meta:
        unique_together = ("userId", "playlistId")


# ----------------------------------------------------------------------------


class Video(models.Model):
    title = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    thumbnail = models.TextField()
    duration = models.DurationField()
    youtubeHash = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.title


class VideoOrder(models.Model):
    index = models.IntegerField(default=0)
    playlistId = models.ForeignKey(Playlist, on_delete=models.CASCADE)
    videoId = models.ForeignKey(Video, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.playlistId.title}: {self.index}"


# ----------------------------------------------------------------------------


class Comment(models.Model):
    text = models.TextField()
    likes = models.IntegerField(default=0)
    dislikes = models.IntegerField(default=0)
    userId = models.ForeignKey(User, on_delete=models.CASCADE)
    playlistId = models.ForeignKey(Playlist, on_delete=models.CASCADE)
    commentId = models.ForeignKey(
        "self", on_delete=models.CASCADE, null=True, blank=True, default=None
    )
    created_at = models.DateTimeField(default=timezone.now, null=True, blank=True)

    def __str__(self):
        return self.text[:100]


# ----------------------------------------------------------------------------


class CommentInteraction(models.Model):
    isLiked = models.BooleanField(default=False)
    isDisliked = models.BooleanField(default=False)
    userId = models.ForeignKey(User, on_delete=models.CASCADE)
    commentId = models.ForeignKey(Comment, on_delete=models.CASCADE)

    def __str__(self):
        if self.isLiked:
            return "liked"
        elif self.isDisliked:
            return "disliked"
        else:
            return "error"


# ----------------------------------------------------------------------------
