from django.contrib.auth import get_user_model
from rest_framework import serializers

from api_accounts.models import Profile

UserModel = get_user_model()


class UserListSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ('id', 'username',)


class UserDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ('id', 'username', 'email')


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('age', 'profile_picture')


class CurrentUserDetailsSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer()

    class Meta:
        model = UserModel
        fields = ('id', 'username', 'email', 'date_joined', 'profile')
