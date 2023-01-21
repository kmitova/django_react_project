from django.contrib.auth import get_user_model
from django.contrib.auth.models import User
from rest_framework import permissions
from rest_framework.exceptions import PermissionDenied
from rest_framework.generics import ListAPIView, RetrieveUpdateAPIView

from api_users.serializers import UserListSerializer, UserDetailsSerializer

UserModel = get_user_model()


class UsersListAPIView(ListAPIView):
    permission_classes = (
        permissions.IsAuthenticated,
    )
    serializer_class = UserListSerializer

    # get users except current user
    def get_queryset(self):
        return UserModel.objects.exclude(id=self.request.user.id)


class UserDetailsAPIView(RetrieveUpdateAPIView):
    queryset = UserModel.objects.all()
    serializer_class = UserDetailsSerializer
    permission_classes = (
        permissions.IsAuthenticated,
    )


    # def get_object(self):
    #     user = super().get_object()
    #     if book.user != self.request.user:
    #         raise PermissionDenied
    #     return book
