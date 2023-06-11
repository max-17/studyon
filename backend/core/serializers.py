
from .models import *
from djoser.serializers import UserCreateSerializer as BaseUserCreateSerializer, UserSerializer as BaseUserSerializer

from rest_framework import serializers, viewsets, status


class SignInSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(
        max_length=255, required=True, write_only=True)


class UserCreateSerializer(BaseUserCreateSerializer):
    class Meta(BaseUserCreateSerializer.Meta):
        fields = ['id', 'email', 'password', 'isAuthor']


class UserSerializer(BaseUserSerializer):
    class Meta(BaseUserSerializer.Meta):
        fields = ['id', 'email', 'isAuthor']


class StudentSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField(read_only=True)
    user_email = serializers.EmailField(source='user.email', read_only=True)

    def get_user_id(self, obj):
        return self.context['user_id']

    class Meta:
        model = Student
        fields = ['id', 'user_id', 'phone',
                  'birth_date', 'first_name', 'last_name', 'user_email']


class AuthorSerializer(serializers.ModelSerializer):
    user = serializers.IntegerField(read_only=True)

    def get_user_id(self, obj):
        return self.context['user_id']

    class Meta:
        model = Author
        fields = ['user']


class CourseCreateSerializer(serializers.ModelSerializer):

    # author = serializers.CharField(read_only=True)

    class Meta:
        model = Course
        fields = ['id', 'title', 'price', 'author', 'duration']


class LectureSerializer(serializers.ModelSerializer):

    class Meta:
        model = Lecture
        fields = ['id', 'title', 'course', 'video', 'text']


class LectureCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Lecture
        fields = ['id', 'title', 'course', 'video', 'text']
        fields = ['id', 'title', 'course', 'text']


class CourseSerializer(serializers.ModelSerializer):

    lectures = LectureSerializer(many=True)

    author = serializers.SerializerMethodField()

    def get_author(self, obj):
        return obj.author.__str__()

    class Meta:
        model = Course
        fields = ['id', 'title', 'author', 'price',
                  'lectures', 'coverImg', 'duration']


class AuthorSerializer(serializers.ModelSerializer):

    courses = CourseSerializer(
        many=True,
        read_only=True,
    )

    class Meta:
        model = Author

        fields = '__all__'

        fields = ['id', 'last_name', 'first_name', 'avatar', 'courses']


class ListCourseSerializer(serializers.ModelSerializer):

    author = serializers.SerializerMethodField()

    def get_author(self, obj):
        return obj.author.__str__()

    class Meta:

        model = Course
        fields = ['id', 'title', 'author', 'price',
                  'lectures', 'coverImg', 'duration']
        depth = 1
