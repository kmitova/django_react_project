from django.contrib.auth import get_user_model
from django.db import models

UserModel = get_user_model()


class Category(models.Model):
    MAX_NAME_LEN = 15

    name = models.CharField(
        max_length=MAX_NAME_LEN,
        null=False,
        blank=False,
        unique=True,
    )


class Book(models.Model):
    MAX_TITLE_LEN = 90
    DEFAULT_STATE = False

    title = models.CharField(
        max_length=MAX_TITLE_LEN,
        null=False,
        blank=False
    )

    author = models.CharField(
        max_length=55,
        null=True,
        blank=True,
    )

    # description = models.TextField(
    #     null=False,
    #     blank=False,
    # )

    # is_read = models.BooleanField(
    #     default=DEFAULT_STATE,
    #     null=False,
    #     blank=False,
    # )

    category = models.ForeignKey(
        Category,
        on_delete=models.RESTRICT,
        null=True
    )

    # user = models.ForeignKey(
    #     UserModel,
    #     on_delete=models.RESTRICT,
    # )


class Review(models.Model):
    # str_fields = ('id', 'book', 'updated_at')

    STARS5 = '5'
    STARS4 = '4'
    STARS3 = '3'
    STARS2 = '2'
    STARS1 = '1'

    RATING_CHOICES = [
        (STARS5, '5 stars'),
        (STARS4, '4 stars'),
        (STARS3, '3 stars'),
        (STARS2, '2 stars'),
        (STARS1, '1 star')
    ]

    content = models.TextField(
        null=False,
        blank=False,
        unique=True,
        editable=True,
    )

    rating = models.CharField(
        max_length=20,
        choices=RATING_CHOICES,
        default='no rating',
        null=False,
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    book = models.ForeignKey(
        Book, on_delete=models.RESTRICT, blank=False, null=False
    )

    user = models.ForeignKey(
        UserModel,
        on_delete=models.RESTRICT,
    )

    # slug = models.SlugField(
    #     max_length=255,
    #     unique=True,
    #     null=False,
    #     blank=True,
    # )
    #
    #
    #
    # def save(self, *args, **kwargs):
    #     super().save(*args, **kwargs)
    #
    #     if not self.slug:
    #         title_slug_list = self.book.title.split(" ")
    #         title_slug = "-".join(title_slug_list)
    #
    #         self.slug = slugify(f'review-of-{self.id}-{title_slug}')
    #
    #     return super().save(*args, **kwargs)

    # class Meta:
    #     ordering = ('-updated_at',)


class IsRead(models.Model):
    DEFAULT_STATE = False

    is_read = models.BooleanField(
        default=DEFAULT_STATE,
        null=False,
        blank=False,
    )
    book = models.ForeignKey(
        Book, on_delete=models.RESTRICT, blank=False, null=False
    )

    user = models.ForeignKey(
        UserModel,
        on_delete=models.RESTRICT,
    )


class WantToRead(models.Model):
    DEFAULT_STATE = False

    want_to_read = models.BooleanField(
        default=DEFAULT_STATE,
        null=False,
        blank=False,
    )
    book = models.ForeignKey(
        Book, on_delete=models.RESTRICT, blank=False, null=False
    )

    user = models.ForeignKey(
        UserModel,
        on_delete=models.RESTRICT,
    )


class CurrentlyReading(models.Model):
    DEFAULT_STATE = False

    currently_reading = models.BooleanField(
        default=DEFAULT_STATE,
        null=False,
        blank=False,
    )
    book = models.ForeignKey(
        Book, on_delete=models.RESTRICT, blank=False, null=False
    )

    user = models.ForeignKey(
        UserModel,
        on_delete=models.RESTRICT,
    )


class Comment(models.Model):
    MAX_TEXT_LENGTH = 300
    text = models.CharField(
        max_length=MAX_TEXT_LENGTH,
        null=False,
        blank=False,
    )

    publication_date = models.DateTimeField(
        auto_now_add=True,
        null=False,
        blank=True,
    )

    review = models.ForeignKey(
        Review,
        on_delete=models.CASCADE,
        null=False,
        blank=True,
    )

    user = models.ForeignKey(UserModel, on_delete=models.CASCADE,)

    class Meta:
        ordering = ['publication_date']


class Shelf(models.Model):
    name = models.CharField(
        max_length=255,
        null=False,
        blank=False,
        unique=True
            )

    user = models.ForeignKey(UserModel, on_delete=models.CASCADE,)


class CustomShelfStatus(models.Model):
    DEFAULT_STATE = False

    custom_shelf_status = models.BooleanField(
        default=DEFAULT_STATE,
        null=False,
        blank=False,
    )
    book = models.ForeignKey(
        Book, on_delete=models.RESTRICT, blank=False, null=False,
    )

    user = models.ForeignKey(
        UserModel,
        on_delete=models.RESTRICT,
    )

    shelf = models.ForeignKey(
        Shelf, on_delete=models.RESTRICT, blank=False, null=False,
    )
