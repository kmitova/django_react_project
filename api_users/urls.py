from django.urls import path

from api_users.views import UsersListAPIView, UserDetailsAPIView

urlpatterns = (
    path('users/', UsersListAPIView.as_view(), name='users list'),
    path('user/<int:pk>/', UserDetailsAPIView.as_view(), name='details user'),
)
