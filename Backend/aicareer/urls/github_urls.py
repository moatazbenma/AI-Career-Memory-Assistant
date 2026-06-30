from ..views.GithubAuthView import GithubAuthView, CurrentUserView
from django.urls import path


urlpatterns = [
    path("auth/github/", GithubAuthView.as_view(), name="github_auth"),
    path("auth/me/", CurrentUserView.as_view(), name="current_user")
]
