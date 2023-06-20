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
from rest_framework.mixins import RetrieveModelMixin, ListModelMixin
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


class CourseViewSet(NestedViewSetMixin, ModelViewSet):

    permission_classes = [IsAuthor]

    def get_serializer_class(self):
        if self.request.method == "POST":
            return CourseCreateSerializer
        return CourseSerializer

    def get_serializer_context(self):
        context = super(CourseViewSet, self).get_serializer_context()

        if self.request.method == 'POST':
            context.update(
                {'author': Author.objects.get(user=self.request.user)})
        return context

    def get_queryset(self):
        return Course.objects.filter(author__user=self.request.user)


class LectureViewSet(NestedViewSetMixin, ModelViewSet):

    serializer_class = LectureSerializer
    permission_classes = [IsAuthor]
    queryset = Lecture.objects.all()

    def get_serializer_class(self):
        if self.request.method == "POST":
            return LectureCreateSerializer
        return LectureSerializer

    def get_serializer_context(self, *args, **kwargs):
        context = super(LectureViewSet, self).get_serializer_context()

        if self.request.method == 'POST':
            context.update({'course': Course.objects.get(id=self.get_parents_query_dict()['course'])})
        return context

    # adding course__author__user filter to nestedViewSetMixen's method filter_queryset_by_parents_lookups

    def filter_queryset_by_parents_lookups(self, queryset):
        # parents_query_lookups
        parents_query_dict = self.get_parents_query_dict()
        if parents_query_dict:

            try:
                return queryset.filter(**parents_query_dict, course__author__user=self.request.user.id) if self.request.user.isAuthor else queryset.filter(**parents_query_dict)
            except ValueError:
                raise Http404
        else:
            return queryset

    # def create(self, request, *args, **kwargs):

    #     data = {
    #         **request.data,
    #         'course': kwargs['parent_lookup_course'],
    #     }

    #     serializer = LectureCreateSerializer(data=data)

    #     serializer.is_valid(raise_exception=True)

    #     serializer.save()

    #     headers = self.get_success_headers(serializer.data)

    #     return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class CoursePublicViewSet(RetrieveModelMixin, ListModelMixin, GenericViewSet):

    serializer_class = ListCourseSerializer

    queryset = Course.objects.all()


class CourseListRetriveViewSet(RetrieveModelMixin, ListModelMixin, GenericViewSet):

    serializer_class = ListCourseSerializer

    permission_classes = [IsStudent]

    def get_queryset(self):
        student = Student.objects.get(user=self.request.user)
        return Course.objects.filter(students__in=[student])


class LectureListRetrieveAPIView(NestedViewSetMixin, RetrieveModelMixin, ListModelMixin, GenericViewSet):

    permission_classes = [IsStudent]
    serializer_class = LectureSerializer
    queryset = Lecture.objects.all()
