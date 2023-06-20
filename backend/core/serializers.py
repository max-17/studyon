
from .models import *
from djoser.serializers import UserCreateSerializer as BaseUserCreateSerializer, UserSerializer as BaseUserSerializer

from rest_framework import serializers, viewsets, status
from .models import Course, Lecture


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
                  'birth_date', 'first_name', 'last_name', 'user_email', 'courses']


class AuthorSerializer(serializers.ModelSerializer):
    user = serializers.IntegerField(read_only=True)

    def get_user_id(self, obj):
        return self.context['user_id']

    class Meta:
        model = Author
        fields = ['user']


class CourseCreateSerializer(serializers.ModelSerializer):

    def validate(self, data):
        author = self.context['author']

        # my code
        return data

    def create(self, validated_data):
        author = self.context['author']
        validated_data['author'] = author
        course = Course.objects.create(**validated_data)
        return course

    class Meta:
        model = Course
        fields = ['id', 'title', 'price', 'coverImg', 'duration']


class LectureSerializer(serializers.ModelSerializer):

    class Meta:
        model = Lecture
        fields = ['id', 'title', 'course', 'video', 'text']


class LectureCreateSerializer(serializers.ModelSerializer):

    def validate(self, data):
        course = self.context['course']

        # my code
        return data

    def create(self, validated_data):
        course = self.context['course']
        validated_data['course'] = course
        lecture = Lecture.objects.create(**validated_data)
        return lecture

    class Meta:
        model = Lecture
        fields = ['id', 'title',  'video', 'text']


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
