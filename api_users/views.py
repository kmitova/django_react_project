from django.contrib.auth import get_user_model
from rest_framework import permissions
from rest_framework.generics import ListAPIView

from api_users.serializers import UserListSerializer

UserModel = get_user_model()


class UsersListAPIView(ListAPIView):
    permission_classes = (
        permissions.IsAuthenticated,
    )
    queryset = UserModel.objects.all()
    serializer_class = UserListSerializer

    # def get_queryset(self):
    #     return self.queryset.filter(id=self.request.user.id).distinct()
