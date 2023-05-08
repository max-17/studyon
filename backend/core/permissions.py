from rest_framework.permissions import BasePermission
from .models import *


class IsAuthenticatedOrCreate(BasePermission):
    def has_permission(self, request, view):
        return bool(
            view.action == 'create' or
            request.user and
            request.user.is_authenticated
        )


class IsAuthor(BasePermission):
    def has_permission(self, request, view):
        return bool(Author.objects.filter(user=request.user).exists() and request.user.is_authenticated)


class IsStudent(BasePermission):
    def has_permission(self, request, view):
        return bool(Student.objects.filter(user=request.user).exists() and request.user.is_authenticated)
