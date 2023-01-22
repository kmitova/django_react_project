from django.contrib.auth.models import User
from django.db import models


class Profile(models.Model):
    age = models.IntegerField()
    profile_picture = models.ImageField(default='default.png', upload_to='profile_images')
    bio = models.CharField(max_length=255, blank=True, null=True)
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        primary_key=True
    )

    def __str__(self):
        return self.user.username

