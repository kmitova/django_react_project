from django.contrib.auth.models import User, AbstractUser
from django.db import models

#
# class Profile(models.Model):
#     age = models.IntegerField()
#     profile_picture = models.ImageField(default='default.png', upload_to='profile_images')
#     bio = models.CharField(max_length=255, blank=True, null=True)
#     user = models.OneToOneField(
#         User,
#         on_delete=models.CASCADE,
#         primary_key=True
#     )
#
#     def __str__(self):
#         return self.user.username

class AppUser(AbstractUser):

    NAME_MAX_LEN = 45
    NAME_MIN_LEN = 2

    first_name = models.CharField(
        max_length=NAME_MAX_LEN,
        null=False,
        blank=True
    )

    last_name = models.CharField(
        max_length=NAME_MAX_LEN,
        null=False,
        blank=True
    )

    email = models.EmailField(
        unique=True,
        null=False,
        blank=False,
    )

    profile_picture = models.ImageField(
        default='default.png', upload_to='profile_images'
    )

    bio = models.CharField(
        max_length=255, blank=True, null=True
    )



    def __str__(self):
        return f"{self.last_name}, {self.first_name}"
