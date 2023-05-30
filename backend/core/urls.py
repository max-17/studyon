from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from rest_framework.routers import DefaultRouter
from rest_framework_extensions.routers import ExtendedSimpleRouter

from .views import AuthorRetrieveUpdateAPIView, StudentRetrieveUpdateAPIView, CourseViewSet, CoursePublicViewSet, LectureViewSet, LectureListRetrieveAPIView

router = ExtendedSimpleRouter()
(
    router.register(r'author/courses', CourseViewSet, basename='course')
    .register(r'lectures',
              LectureViewSet,
              basename='courses-lecture',
              parents_query_lookups=['course']),
)
router.register(r'courses', CoursePublicViewSet, basename='course').register(r'lectures',
                                                                             LectureListRetrieveAPIView,
                                                                             basename='courses-lecture',
                                                                             parents_query_lookups=['course'])


urlpatterns = [
    # path('user/', UserCreateAPIView.as_view()),
    path('author/', AuthorRetrieveUpdateAPIView.as_view()),
    path('student/', StudentRetrieveUpdateAPIView.as_view()),
]


urlpatterns = format_suffix_patterns(
    urlpatterns) + router.urls
