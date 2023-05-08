from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
<<<<<<< HEAD
from rest_framework.routers import DefaultRouter
from .views import AuthorRetrieveUpdateAPIView, StudentRetrieveUpdateAPIView, CourseViewSet

router = DefaultRouter()
router.register(r'author/courses', CourseViewSet, basename='course')
=======
from .views import AuthorRetrieveUpdateAPIView, StudentRetrieveUpdateAPIView
>>>>>>> bf85c6042b51f32c313570aff81a4d9b44e89503

urlpatterns = [
    # path('user/', UserCreateAPIView.as_view()),
    path('author/', AuthorRetrieveUpdateAPIView.as_view()),
    path('student/', StudentRetrieveUpdateAPIView.as_view()),
]

<<<<<<< HEAD
urlpatterns = format_suffix_patterns(
    urlpatterns) + router.urls
=======
urlpatterns = format_suffix_patterns(urlpatterns)
>>>>>>> bf85c6042b51f32c313570aff81a4d9b44e89503
