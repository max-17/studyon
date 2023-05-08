
from .models import *
from djoser.serializers import UserCreateSerializer as BaseUserCreateSerializer, UserSerializer as BaseUserSerializer
<<<<<<< HEAD

from rest_framework import serializers, viewsets, status


=======
from rest_framework import serializers, viewsets, status


class SignInSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(
        max_length=255, required=True, write_only=True)


>>>>>>> bf85c6042b51f32c313570aff81a4d9b44e89503
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


<<<<<<< HEAD
=======
class AuthorSerializer(serializers.ModelSerializer):
    user = serializers.IntegerField(read_only=True)

    def get_user_id(self, obj):
        return self.context['user_id']

    class Meta:
        model = Author
        fields = ['user']


>>>>>>> bf85c6042b51f32c313570aff81a4d9b44e89503
# class QueueCreateSerializer(serializers.ModelSerializer):

#     # customer = serializers.PrimaryKeyRelatedField(read_only=True)

#     class Meta:
#         model = Queue
#         fields = ['id', 'service', 'customer']
#         # depth = 1

#     # def get_customer(self):
#     #     return self.context['customer']


# class QueueSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Queue
#         fields = ['id', 'service', 'placed_at']
#         depth = 1


# class ServiceQueueSerializer(serializers.ModelSerializer):
#     # customer = CustomerSerializer()
#     class Meta:
#         model = Queue
#         fields = ['id', 'customer', 'queue_status', 'placed_at']
#         depth = 1

# class CustomFormSerializer(serializers.ModelSerializer):
#     column = serializers.HyperlinkedIdentityField(many=True, view_name='formColumns-detail', read_only=True)
#     class Meta:
#         model = CustomForm
#         fields = ['id', 'name', 'service', 'column']


# class FormColumnSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = FormColumn
#         fields = ['id', 'form', 'name',]

# class FormDataSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = FormData
#         fields = ['id', 'form', 'data',]

class CourseSerializer(serializers.ModelSerializer):

<<<<<<< HEAD
    class Meta:
        model = Course
        fields = ['id', 'title', 'author']
        # depth = 1
=======
    def validate(self, data):
        author_id = self.context['author_id']

        return data

    def create(self, validated_data):
        author_id = self.context['author_id']
        validated_data['author_id'] = author_id
        course = Course.objects.create(**validated_data)
        return course

    class Meta:
        model = Course
        fields = ['id', 'title', 'author']
        depth = 1
>>>>>>> bf85c6042b51f32c313570aff81a4d9b44e89503


class AuthorSerializer(serializers.ModelSerializer):

    courses = CourseSerializer(
        many=True,
        read_only=True,
    )

    class Meta:
        model = Author
<<<<<<< HEAD
        fields = '__all__'
=======
        fields = ['id', 'last_name', 'first_name', 'avatar', 'courses']
>>>>>>> bf85c6042b51f32c313570aff81a4d9b44e89503


class ListCourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ['id', 'title', 'author',]
        depth = 1
