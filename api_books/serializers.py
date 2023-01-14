from rest_framework import serializers

from api_books.models import Book, Category


class BooksListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ('id', 'title', 'author', 'is_read')


class BookAddSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ('id', 'title', 'author',)

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)


class BookUpdateStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = 'is_read',

    def update(self, instance, validated_data):
        if self.partial and validated_data.get('is_read') == False:
            validated_data['is_read'] = False
        super().update(instance=instance, validated_data=validated_data)
        return instance


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'name',)



class BookDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ('id', 'title', 'author', 'is_read', 'category')