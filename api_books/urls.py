from django.urls import path

from api_books.views import BookAddAPIView, BookDetailsAPIView, CategoriesAPIView, BooksListView

urlpatterns = (
    path('books/', BooksListView.as_view(), name='books list'),
    path('add_book/', BookAddAPIView.as_view(), name='add book'),
    path('book/<int:pk>/', BookDetailsAPIView.as_view(), name='details book'),
    path('categories/', CategoriesAPIView.as_view(), name='book categories'),
)