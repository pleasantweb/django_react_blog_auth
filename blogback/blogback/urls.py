from django.contrib import admin
from django.urls import path
from django.urls.conf import include
from blog import views
from rest_framework.routers import DefaultRouter
from django.conf import settings
from django.conf.urls.static import static

router = DefaultRouter()
router.register('blogapi',views.BlogViewSet,basename='blog')


urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/',include('djoser.urls')),
    path('auth/',include('djoser.urls.jwt')),
    path('blog/',include(router.urls)),
] +static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT) 
