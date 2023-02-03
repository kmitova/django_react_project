from django.urls import path

from api_books.views import BookAddAPIView, BookDetailsAPIView, CategoriesAPIView, BooksListView, \
    BookStatusUpdateAPIView, ReviewAddAPIView, ReviewAPIView, ReviewUpdateAPIView, ReviewDeleteAPIView, BookStatusView, \
    WantToReadAddBookAPIView, WantToReadViewAPIView, EditWantToReadViewAPIView

urlpatterns = (
    path('books/', BooksListView.as_view(), name='books list'),
    # path('add_book/', BookAddAPIView.as_view(), name='add book'),
    path('change_book_status/<int:pk>/', BookStatusUpdateAPIView.as_view(), name='change book status'),
    path('view_book_status/<int:pk>/', BookStatusView.as_view(), name='view book status'),
    path('want_to_read/', WantToReadAddBookAPIView.as_view(), name='want to read add'),
    path('view_want_to_read/', WantToReadViewAPIView.as_view(), name='view want to read'),
    path('edit_want_to_read/<int:pk>/', EditWantToReadViewAPIView.as_view(), name='edit want to read'),

    path('book/<int:pk>/', BookDetailsAPIView.as_view(), name='details book'),
    path('add_review/', ReviewAddAPIView.as_view(), name='add review'),
    path('show_review/', ReviewAPIView.as_view(), name='show review'),
    path('edit_review/<int:pk>/', ReviewUpdateAPIView.as_view(), name='edit review'),
    path('delete_review/<int:pk>/', ReviewDeleteAPIView.as_view(), name='delete review'),
    path('categories/', CategoriesAPIView.as_view(), name='book categories'),
)

