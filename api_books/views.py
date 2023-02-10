from rest_framework import permissions
from rest_framework.exceptions import PermissionDenied
from rest_framework.generics import ListCreateAPIView, ListAPIView, RetrieveUpdateAPIView, CreateAPIView, \
    RetrieveDestroyAPIView

from api_books.models import Book, Category, Review, IsRead, WantToRead, CurrentlyReading
from api_books.serializers import BookAddSerializer, BooksListSerializer, CategorySerializer, BookDetailsSerializer, \
     BookAddReviewSerializer, ReviewSerializer, BookEditReviewSerializer, \
    BookDeleteReviewSerializer, WantToReadBook, AddWantToReadBookSerializer, AddToCurrentlyReadingSerializer, \
    CurrentlyReadingSerializer, ChangeIsReadSerializer, BookIsReadSerializer


class BooksListView(ListAPIView):
    permission_classes = (
        permissions.IsAuthenticated,
    )
    queryset = Book.objects.all()
    serializer_class = BooksListSerializer


class ReviewAPIView(ListAPIView):
    permission_classes = (
        permissions.IsAuthenticated,
    )
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    print(queryset)

    def get_queryset(self):
        return self.queryset.filter(user_id=self.request.user.id).distinct()


class BookAddAPIView(ListCreateAPIView):
    queryset = Book.objects.all()
    create_serializer_class = BookAddSerializer
    list_serializer_class = BooksListSerializer
    permission_classes = (
        permissions.IsAuthenticated,
    )

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return self.list_serializer_class
        return self.create_serializer_class

    def get_queryset(self):
        queryset = self.queryset

        queryset = self.queryset.filter(user=self.request.user)
        category_id = self.request.query_params.get('category', None)
        if category_id:
            queryset = queryset.filter(category_id=category_id)
        return queryset


class BookStatusView(ListAPIView):
    serializer_class = BookIsReadSerializer
    permission_classes = (
        permissions.IsAuthenticated,
    )
    lookup_url_kwarg = "pk"

    def get_queryset(self):
        user = self.request.user
        pk = self.kwargs.get(self.lookup_url_kwarg)
        queryset = IsRead.objects.filter(user=user, book=pk)
        return queryset


class AllReadBooksStatusView(ListAPIView):
    queryset = IsRead.objects.all()
    serializer_class = BookIsReadSerializer
    permission_classes = (
        permissions.IsAuthenticated,
    )


class BookStatusUpdateAPIView(CreateAPIView):
    queryset = IsRead.objects.all()
    serializer_class = ChangeIsReadSerializer
    permission_classes = (
        permissions.IsAuthenticated,
    )

class IsReadAPIView(ListAPIView):
    queryset = IsRead.objects.all()
    serializer_class = BookIsReadSerializer
    permission_classes = (
        permissions.IsAuthenticated,
    )

class RemoveIsReadAPIView(RetrieveDestroyAPIView):
    queryset = IsRead.objects.all()
    serializer_class = ChangeIsReadSerializer
    permission_classes = (
        permissions.IsAuthenticated,
    )

    def get_object(self):
        object = super().get_object()
        if object.user != self.request.user:
            raise PermissionDenied
        return object


class CurrentlyReadingAddAPIView(CreateAPIView):
    queryset = CurrentlyReading.objects.all()
    serializer_class = AddToCurrentlyReadingSerializer
    permission_classes = (
        permissions.IsAuthenticated,
    )


class CurrentlyReadingAPIView(ListAPIView):
    queryset = CurrentlyReading.objects.all()
    serializer_class = CurrentlyReadingSerializer
    permission_classes = (
        permissions.IsAuthenticated,
    )

    # def get_queryset(self):
    #     user = self.request.user
    #     pk = self.kwargs.get(self.lookup_url_kwarg)
    #     queryset = CurrentlyReading.objects.filter(user=user, currently_reading=True)
    #     return queryset


class RemoveFromCurrentlyReadingAPIView(RetrieveDestroyAPIView):
    queryset = CurrentlyReading.objects.all()
    serializer_class = AddToCurrentlyReadingSerializer
    permission_classes = (
        permissions.IsAuthenticated,
    )

    def get_object(self):
        object = super().get_object()
        if object.user != self.request.user:
            raise PermissionDenied
        return object


class WantToReadAddBookAPIView(CreateAPIView):
    queryset = WantToRead.objects.all()
    serializer_class = AddWantToReadBookSerializer
    permission_classes = (
        permissions.IsAuthenticated,
    )


class WantToReadViewAPIView(ListAPIView):
    queryset = WantToRead.objects.all()
    serializer_class = WantToReadBook
    permission_classes = (
        permissions.IsAuthenticated,
    )

    # def get_queryset(self):
    #     user = self.request.user
    #     pk = self.kwargs.get(self.lookup_url_kwarg)
    #     queryset = WantToRead.objects.filter(user=user, want_to_read=True)
    #     return queryset


class RemoveFromWantToReadViewAPIView(RetrieveDestroyAPIView):
    queryset = WantToRead.objects.all()
    serializer_class = AddWantToReadBookSerializer
    permission_classes = (
        permissions.IsAuthenticated,
    )

    def get_object(self):
        object = super().get_object()
        if object.user != self.request.user:
            raise PermissionDenied
        return object


class ReviewDeleteAPIView(RetrieveDestroyAPIView):
    queryset = Review.objects.all()
    serializer_class = BookDeleteReviewSerializer
    permission_classes = (
        permissions.IsAuthenticated,
    )


class ReviewUpdateAPIView(RetrieveUpdateAPIView):
    queryset = Review.objects.all()
    serializer_class = BookEditReviewSerializer
    permission_classes = (
        permissions.IsAuthenticated,
    )

    def get_object(self):
        review = super().get_object()
        if review.user != self.request.user:
            raise PermissionDenied
        return review


class CategoriesAPIView(ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = (
        permissions.IsAuthenticated,
    )

    def get_queryset(self):
        return self.queryset.filter(book__user_id=self.request.user.id).distinct()


class BookDetailsAPIView(RetrieveUpdateAPIView):
    queryset = Book.objects.all()
    serializer_class = BookDetailsSerializer
    permission_classes = (
        permissions.IsAuthenticated,
    )

    def get_object(self):
        book = super().get_object()
        return book


class ReviewAddAPIView(CreateAPIView):
    queryset = Review.objects.all()
    serializer_class = BookAddReviewSerializer

    permission_classes = (
        permissions.IsAuthenticated,
    )
