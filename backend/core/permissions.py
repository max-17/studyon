from rest_framework.permissions import BasePermission
from .models import Student, Author


class IsAuthenticatedOrCreate(BasePermission):
    def has_permission(self, request, view):
        return bool(
            view.action == 'create' or
            request.user and
            request.user.is_authenticated
        )


class IsAuthor(BasePermission):
    def has_permission(self, request, view):
        if (request.user and request.user.is_authenticated):
            print(request.user)
            return Author.objects.filter(user=request.user).exists()
        return False


class IsStudent(BasePermission):
    def has_permission(self, request, view):
        if (request.user and request.user.is_authenticated):
            return Student.objects.filter(user=request.user).exists()
        return False
