from django.urls import path

from api_books.views import BookAddAPIView, BookDetailsAPIView, CategoriesAPIView, BooksListView, \
    BookStatusUpdateAPIView, ReviewAddAPIView, ReviewAPIView, ReviewUpdateAPIView

urlpatterns = (
    path('books/', BooksListView.as_view(), name='books list'),
    path('add_book/', BookAddAPIView.as_view(), name='add book'),
    path('change_book_status/<int:pk>/', BookStatusUpdateAPIView.as_view(), name='change book status'),
    path('book/<int:pk>/', BookDetailsAPIView.as_view(), name='details book'),
    path('add_review/', ReviewAddAPIView.as_view(), name='add review'),
    path('show_review/', ReviewAPIView.as_view(), name='show review'),
    path('edit_review/<int:pk>/', ReviewUpdateAPIView.as_view(), name='edit review'),
    path('categories/', CategoriesAPIView.as_view(), name='book categories'),
)



# TODO:
#  SHOW EXISTING REVIEW IF ANY (VIEW, SERIALIZER, URL-GET METHOD)
