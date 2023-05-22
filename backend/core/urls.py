from .views import AuthorRetrieveUpdateAPIView, StudentRetrieveUpdateAPIView
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from rest_framework.routers import DefaultRouter
from .views import AuthorRetrieveUpdateAPIView, StudentRetrieveUpdateAPIView, CourseViewSet

router = DefaultRouter()
router.register(r'author/courses', CourseViewSet, basename='course')


urlpatterns = [
    # path('user/', UserCreateAPIView.as_view()),
    path('author/', AuthorRetrieveUpdateAPIView.as_view()),
    path('student/', StudentRetrieveUpdateAPIView.as_view()),
]


urlpatterns = format_suffix_patterns(
    urlpatterns) + router.urls
