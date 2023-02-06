from rest_framework import serializers

from api_books.models import Book, Category, Review, IsRead, WantToRead, CurrentlyReading


class BooksListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ('id', 'title', 'author',)


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ('id', 'content', 'rating', 'book')


class BookUpdateStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = IsRead
        fields = ('is_read', 'user', 'book')


class BookDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ('id', 'title', 'author', 'category')


class CurrentlyReadingSerializer(serializers.ModelSerializer):
    book = BookDetailsSerializer(read_only=True)

    class Meta:
        model = CurrentlyReading
        fields = ('id', 'currently_reading', 'user', 'book')


class AddToCurrentlyReadingSerializer(serializers.ModelSerializer):
    class Meta:
        model = CurrentlyReading
        fields = ('id', 'currently_reading', 'user', 'book')

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)

    def update(self, instance, validated_data):
        super().update(instance=instance, validated_data=validated_data)
        return instance


class WantToReadBook(serializers.ModelSerializer):
    book = BookDetailsSerializer(read_only=True)

    class Meta:
        model = WantToRead
        fields = ('id', 'want_to_read', 'user', 'book')


class AddWantToReadBookSerializer(serializers.ModelSerializer):
    class Meta:
        model = WantToRead
        fields = ('id', 'want_to_read', 'user', 'book')

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)

    def update(self, instance, validated_data):
        super().update(instance=instance, validated_data=validated_data)
        return instance


class BookAddReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ('id', 'rating', 'content', 'book')

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)


class BookEditReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ('id', 'rating', 'content', 'book')

    def update(self, instance, validated_data):
        super().update(instance=instance, validated_data=validated_data)
        return instance


class BookDeleteReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ('id',)


class BookAddSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ('id', 'title', 'author',)

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'name',)


