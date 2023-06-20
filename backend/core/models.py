from django.contrib import admin
from django.contrib.auth.hashers import make_password
from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.contrib.auth.models import AbstractUser
# from django.db import models
from django.db import models
from django.conf import settings
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _
from ckeditor.fields import RichTextField


def validate_positive(value):
    if value < 0:
        raise ValidationError(
            _("%(value)s is not a positive number"),
            params={"value": value},
        )


class CustomUserManager(BaseUserManager):
    use_in_migrations = True

    def _create_user(self, email, password, **extra_fields):
        """
        Create and save a user with the given username, email, and password.
        """
        if not email:
            raise ValueError("The given username must be set")
        email = self.normalize_email(email)
        # Lookup the real model class from the global app registry so this
        # manager method can be used in migrations. This is fine because
        # managers are by definition working on the real model.
        user = self.model(email=email, **extra_fields)
        user.password = make_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email=None, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", False)
        extra_fields.setdefault("is_superuser", False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email=None, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self._create_user(email, password, **extra_fields)


# Create your models here.

class User(AbstractUser):
    email = models.EmailField(unique=True)
    username = None
    isAuthor = models.BooleanField(default=False)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['password']

    objects = CustomUserManager()

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)  # Call the "real" save() method.
        if self.isAuthor:
            Author.objects.create(user=self)

        if not self.isAuthor and not self.is_superuser:
            Student.objects.create(user=self)


class Author(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    last_name = models.CharField(max_length=255, blank=True)
    first_name = models.CharField(max_length=255, blank=True)

    avatar = models.FileField(
        upload_to=None, max_length=100, blank=True, null=True)

    avatar = models.FileField(upload_to=None, max_length=100, blank=True)

    def __str__(self):
        return f'{self.first_name} {self.last_name}'


class Course(models.Model):
    title = models.CharField(max_length=100)
    price = models.IntegerField(default=0, validators=[validate_positive])
    author = models.ForeignKey(
        Author, on_delete=models.CASCADE,  related_name='courses')
    duration = models.CharField(max_length=50)
    coverImg = models.FileField(upload_to=None, max_length=100)
    description = RichTextField(blank=True)

    def __str__(self):
        return self.title


class Student(models.Model):

    first_name = models.CharField(max_length=50, blank=True)
    last_name = models.CharField(max_length=50, blank=True)
    phone = models.CharField(max_length=255, blank=True)
    birth_date = models.DateField(null=True, blank=True)
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, unique=True)

    courses = models.ManyToManyField(Course, related_name='students')

    def __str__(self):
        return f'{self.first_name} {self.last_name}'

    # @admin.display(ordering='user__first_name')
    # def first_name(self):
    #     return self.user.first_name

    # @admin.display(ordering='user__last_name')
    # def last_name(self):
    #     return self.user.last_name

    class Meta:
        ordering = ['user__first_name', 'user__last_name']


class Lecture(models.Model):
    title = models.CharField(max_length=255)
    course = models.ForeignKey(
        Course, on_delete=models.CASCADE, related_name='lectures')
    video = models.FileField(upload_to=None, max_length=100)

    text = RichTextField(blank=True)


class Assignment(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    lecture = models.OneToOneField(
        Lecture, on_delete=models.CASCADE, related_name='lecture')
    submittion = models.FileField(upload_to=None, max_length=100)
