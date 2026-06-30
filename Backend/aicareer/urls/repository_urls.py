from django.urls import path
from ..views.GithubAuthView import GithubAuthView
from ..views.RepositoryView import FetchReposView, RepositoryListView, RepositoryDetailView




urlpatterns = [
    path("repos/fetch/", FetchReposView.as_view(), name="fetch_repos"),
    path("repos/", RepositoryListView.as_view(), name="repository_list"),
    path("repos/<int:repo_id>/", RepositoryDetailView.as_view(), name="repository_detail"),
]
