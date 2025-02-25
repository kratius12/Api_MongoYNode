from django.urls import path
from .views import autocorrect_view

urlpatterns = [
    path('', autocorrect_view, name='autocorrect'),
]