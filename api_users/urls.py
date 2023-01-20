from django.urls import path

from api_users.views import UsersListAPIView

urlpatterns = (
    path('users/', UsersListAPIView.as_view(), name='users list'),
)
