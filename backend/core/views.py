from django.shortcuts import get_object_or_404
from django.db.models import Prefetch
from django.http import JsonResponse
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import RetrieveUpdateAPIView
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework_extensions.mixins import NestedViewSetMixin
# from rest_framework.mixins import CreateModelMixin, RetrieveModelMixin, UpdateModelMixin, ListModelMixin
from rest_framework.permissions import IsAuthenticated
from core.permissions import IsAuthor, IsStudent
from rest_framework.decorators import action
from rest_framework import status
from rest_framework.filters import SearchFilter
from core.models import Student, Author, Lecture
from core.serializers import *
# Create your views here.


class AuthorRetrieveUpdateAPIView(RetrieveUpdateAPIView):

    serializer_class = AuthorSerializer

    def get_object(self):
        return get_object_or_404(Author, user_id=self.request.user.id)

    permission_classes = [IsAuthenticated]


class StudentRetrieveUpdateAPIView(RetrieveUpdateAPIView):

    serializer_class = StudentSerializer

    def get_object(self):
        return get_object_or_404(Student, user_id=self.request.user.id)

    permission_classes = [IsAuthenticated]


class CourseViewSet(NestedViewSetMixin, viewsets.ModelViewSet):

    serializer_class = CourseSerializer

    def get_queryset(self):
        return Course.objects.filter(author__user=self.request.user)

    def create(self, request, *args, **kwargs):

        data = {
            **request.data,
            'author': Author.objects.get(user=request.user).id,
        }
        # print(80*'*')
        # print(data)
        serializer = CourseCreateSerializer(data=data)

        serializer.is_valid(raise_exception=True)
        # print(80*'*')
        # print(serializer.validated_data)

        serializer.save()

        headers = self.get_success_headers(serializer.data)

        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class LectureViewSet(NestedViewSetMixin, viewsets.ModelViewSet):

    serializer_class = LectureSerializer
    permission_classes = [IsAuthenticated]
    queryset = Lecture.objects.all()


# adding course__author__user filter to nestedViewSetMixen's method filter_queryset_by_parents_lookups


    def filter_queryset_by_parents_lookups(self, queryset):
        # parents_query_lookups
        parents_query_dict = self.get_parents_query_dict()
        if parents_query_dict:
            try:
                return queryset.filter(**parents_query_dict, course__author__user=self.request.user.id)
            except ValueError:
                raise Http404
        else:
            return queryset

    def create(self, request, *args, **kwargs):

        data = {
            **request.data,
            'course': kwargs['parent_lookup_course'],
        }
        print(80*'*')
        print(data)
        serializer = LectureCreateSerializer(data=data)

        serializer.is_valid(raise_exception=True)
        # print(80*'*')
        # print(serializer.validated_data)

        serializer.save()

        headers = self.get_success_headers(serializer.data)

        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
