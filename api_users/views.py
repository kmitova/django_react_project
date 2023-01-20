from django.contrib.auth import get_user_model
from django.contrib.auth.models import User
from rest_framework import permissions
from rest_framework.generics import ListAPIView

from api_users.serializers import UserListSerializer

UserModel = get_user_model()


class UsersListAPIView(ListAPIView):
    permission_classes = (
        permissions.IsAuthenticated,
    )
    serializer_class = UserListSerializer

    def get_queryset(self):
        return UserModel.objects.exclude(id=self.request.user.id)
    #
