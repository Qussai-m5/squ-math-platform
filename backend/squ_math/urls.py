from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken.views import obtain_auth_token
from academics.views import CourseViewSet
from resources.views import TextbookViewSet, MaterialViewSet

router = DefaultRouter()
router.register(r'courses', CourseViewSet)
router.register(r'textbooks', TextbookViewSet)
router.register(r'materials', MaterialViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/ai/', include('ai_tutor.urls')),
    path('api/api-token-auth/', obtain_auth_token),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
