from django.urls import path

from api_users.views import UsersListAPIView, UserDetailsAPIView, CurrentUserDetailsAPIView

urlpatterns = (
    path('users/', UsersListAPIView.as_view(), name='users list'),
    path('user/<int:pk>/', UserDetailsAPIView.as_view(), name='details user'),
    path('your_profile/<int:pk>/', CurrentUserDetailsAPIView.as_view(), name='your_profile'),
)
