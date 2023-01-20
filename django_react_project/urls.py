
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api_accounts/', include('api_accounts.urls')),
    path('api_books/', include('api_books.urls')),
    path('api_users/', include('api_users.urls')),
]
