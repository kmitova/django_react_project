from django.contrib.auth import get_user_model
from rest_framework import serializers

# from api_accounts.models import Profile

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
        model = UserModel
        fields = ('age', 'profile_picture', 'bio')


class CurrentUserDetailsSerializer(serializers.ModelSerializer):
    # profile = ProfileSerializer()

    class Meta:
        model = UserModel
        fields = ('id', 'username', 'email', 'date_joined', 'first_name', 'last_name', 'bio', 'profile_picture')


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ('id', 'username', 'email', 'date_joined', 'first_name', 'last_name', 'bio', 'profile_picture')


class ProfileEditSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserModel
        fields = ('id', 'last_name', 'first_name', 'bio', 'username', 'profile_picture', 'email')

