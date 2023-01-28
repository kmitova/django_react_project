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
        fields = ('age', 'profile_picture', 'bio')


class CurrentUserDetailsSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer()

    class Meta:
        model = UserModel
        fields = ('id', 'username', 'email', 'date_joined', 'profile', 'first_name', 'last_name')


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ('id', 'username', 'email', 'date_joined', 'profile', 'first_name', 'last_name')


class ProfileEditSerializer(serializers.ModelSerializer):
    # user = UserSerializer()
    # profile = serializers.DictField()
    # print(profile)

    class Meta:
        model = Profile
        fields = ('age', 'bio', 'user_id')

        # fields = ('id', 'last_name', 'first_name', 'email', 'profile')

    # def update(self, instance, validated_data):
    #     data = validated_data.pop('profile', None)
    #     print(type(data))
    #     for (key, value) in validated_data.items():
    #         setattr(instance, key, value)
    #     if data is not None:
    #         print(instance)
    #         # user_instance = instance.user
    #         for key, value in data.items():
    #             print(key, value)
    #             setattr(instance, key, value)
    #         instance.save()
    #
    #     instance.save()
    #     return instance
    # def update(self, instance, validated_data):
    #     profile_data = validated_data.pop('profile')
    #     print(dict(profile_data))
    #     print(validated_data)
    #     instance = UserModel.objects.update(**validated_data)
    #     for item_data in profile_data.items():
    #         print(item_data)
    #         Profile.objects.update(user=instance, **profile_data)
    #     print(validated_data)
    #     # super().update(instance=instance, validated_data=validated_data)
    #     return instance
    # def update(self, instance, validated_data):
    #     instance = Profile.objects.update(**validated_data)
    #
    #     super().update(instance=instance, validated_data=validated_data)
    #     return instance
