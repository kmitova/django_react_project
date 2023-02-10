from django.urls import path

from api_books.views import BookAddAPIView, BookDetailsAPIView, CategoriesAPIView, BooksListView, \
    BookStatusUpdateAPIView, ReviewAddAPIView, ReviewAPIView, ReviewUpdateAPIView, ReviewDeleteAPIView, BookStatusView, \
    WantToReadAddBookAPIView, WantToReadViewAPIView, RemoveFromWantToReadViewAPIView, CurrentlyReadingAddAPIView, \
    CurrentlyReadingAPIView, RemoveFromCurrentlyReadingAPIView, AllReadBooksStatusView, IsReadAPIView, \
    RemoveIsReadAPIView

urlpatterns = (
    path('books/', BooksListView.as_view(), name='books list'),

    path('change_book_status/', BookStatusUpdateAPIView.as_view(), name='change book status'),
    path('view_book_status/<int:pk>/', IsReadAPIView.as_view(), name='view book status'),
    path('view_book_status/', IsReadAPIView.as_view(), name='view book status all'),
    path('edit_book_status/<int:pk>/', RemoveIsReadAPIView.as_view(), name='edit book status'),

    path('want_to_read/', WantToReadAddBookAPIView.as_view(), name='want to read add'),
    path('view_want_to_read/', WantToReadViewAPIView.as_view(), name='view want to read'),
    path('view_want_to_read/<int:pk>/', WantToReadViewAPIView.as_view(), name='view want to read'),
    path('edit_want_to_read/<int:pk>/', RemoveFromWantToReadViewAPIView.as_view(), name='edit want to read'),

    path('currently_reading/', CurrentlyReadingAddAPIView.as_view(), name='currently reading add'),
    path('view_currently_reading/', CurrentlyReadingAPIView.as_view(), name='view currently reading'),
    path('view_currently_reading/<int:pk>/', CurrentlyReadingAPIView.as_view(), name='view want to read'),
    path('edit_currently_reading/<int:pk>/', RemoveFromCurrentlyReadingAPIView.as_view(), name='edit currently reading'),

    path('book/<int:pk>/', BookDetailsAPIView.as_view(), name='details book'),
    path('add_review/', ReviewAddAPIView.as_view(), name='add review'),
    path('show_review/', ReviewAPIView.as_view(), name='show review'),
    path('edit_review/<int:pk>/', ReviewUpdateAPIView.as_view(), name='edit review'),
    path('delete_review/<int:pk>/', ReviewDeleteAPIView.as_view(), name='delete review'),
    path('categories/', CategoriesAPIView.as_view(), name='book categories'),
)

