
from rest_framework import permissions
from rest_framework.exceptions import PermissionDenied
from rest_framework.generics import ListCreateAPIView, ListAPIView, RetrieveUpdateAPIView, CreateAPIView, \
    RetrieveDestroyAPIView

from api_books.models import Book, Category, Review
from api_books.serializers import BookAddSerializer, BooksListSerializer, CategorySerializer, BookDetailsSerializer, \
    BookUpdateStatusSerializer, BookAddReviewSerializer, ReviewSerializer, BookEditReviewSerializer, \
    BookDeleteReviewSerializer


class BooksListView(ListAPIView):
    permission_classes = (
        permissions.IsAuthenticated,
    )
    queryset = Book.objects.all()
    serializer_class = BooksListSerializer

    def get_queryset(self):
        return self.queryset.filter(user_id=self.request.user.id).distinct()


class ReviewAPIView(ListAPIView):
    permission_classes = (
        permissions.IsAuthenticated,
    )
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer

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


class BookStatusUpdateAPIView(RetrieveUpdateAPIView):
    queryset = Book.objects.all()
    serializer_class = BookUpdateStatusSerializer
    permission_classes = (
        permissions.IsAuthenticated,
    )

    def get_object(self):
        book = super().get_object()
        if book.user != self.request.user:
            raise PermissionDenied
        return book


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
        if book.user != self.request.user:
            raise PermissionDenied
        return book


class ReviewAddAPIView(CreateAPIView):
    queryset = Review.objects.all()
    serializer_class = BookAddReviewSerializer

    permission_classes = (
        permissions.IsAuthenticated,
    )
