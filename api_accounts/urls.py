from django.urls import path
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

from api_accounts.views import MyTokenObtainPairView, RegisterView, get_routes, testEndPoint

urlpatterns = [
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', RegisterView.as_view(), name='auth_register'),
    path('', get_routes),
    path('test/', testEndPoint, name='test'),
]