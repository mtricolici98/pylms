from django.urls import path

from .views import (
    UserRegistrationView,
    UserLoginView,
    UserProfileView, change_password,
)

urlpatterns = [
    path("signup", UserRegistrationView.as_view()),
    path("signin", UserLoginView.as_view()),
    path("profile", UserProfileView.as_view()),
    path("change_password", change_password),
]
