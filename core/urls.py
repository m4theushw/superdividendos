from django.urls import path
from . import views

app_name = 'core'

urlpatterns = [
    path('calculate', views.calculate),
    path('search', views.search),
]
