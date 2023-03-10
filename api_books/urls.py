from django.urls import path

from api_books.views import BookDetailsAPIView, CategoriesAPIView, BooksListView, \
    BookStatusUpdateAPIView, ReviewAddAPIView, ReviewAPIView, ReviewUpdateAPIView, ReviewDeleteAPIView, BookStatusView, \
    WantToReadAddBookAPIView, WantToReadViewAPIView, RemoveFromWantToReadViewAPIView, CurrentlyReadingAddAPIView, \
    CurrentlyReadingAPIView, RemoveFromCurrentlyReadingAPIView, IsReadAPIView, \
    RemoveIsReadAPIView, AllOtherReviewsOfThisBook, AllReviewsByUserAPIView, ListAddShelfAPIView, \
    AddViewBookToCustomShelfAPIView, BooksOnCustomShelvesAPIView, ShowCustomShelvesBooks, \
    AddCommentToReviewAPIView, ShowCommentsOnReview, ShowAllUsersComments, CommentDeleteAPIView, AllReviewsOfThisBook

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
    path('show_other_reviews/', AllOtherReviewsOfThisBook.as_view(), name='show other reviews'),
    path('show_reviews_of_user/<int:pk>/', AllReviewsByUserAPIView.as_view(), name='show reviews by this user'),
    path('show_all_reviews_of_book/', AllReviewsOfThisBook.as_view(), name='show all reviews of book'),

    path('edit_review/<int:pk>/', ReviewUpdateAPIView.as_view(), name='edit review'),
    path('delete_review/<int:pk>/', ReviewDeleteAPIView.as_view(), name='delete review'),
    path('categories/', CategoriesAPIView.as_view(), name='book categories'),

    path('add_shelf/', ListAddShelfAPIView.as_view(), name='add shelf'),
    path('view_shelves/', ListAddShelfAPIView.as_view(), name='view shelves'),
    path('add_book_to_shelf/', AddViewBookToCustomShelfAPIView.as_view(), name='add book to custom shelf'),
    path('view_books_on_custom_shelves/', AddViewBookToCustomShelfAPIView.as_view(), name='view books on custom shelves'),
    path('view_custom_shelf/<int:pk>/', BooksOnCustomShelvesAPIView.as_view(), name='view custom shelf'),
    path('show_books_on_custom_shelf/<int:pk>/', ShowCustomShelvesBooks.as_view(), name='show books on custom shelves'),

    path('add_comment/', AddCommentToReviewAPIView.as_view(), name='add comment'),
    path('show_comments/<int:pk>/', ShowCommentsOnReview.as_view(), name='show comments'),

    path('show_user_comments/<int:pk>/', ShowAllUsersComments.as_view(), name='show user comments'),
    path('delete_comment/<int:pk>/', CommentDeleteAPIView.as_view(), name='delete comment'),

)

