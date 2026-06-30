from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from ..models import Repository
from ..serializers.repository_serializer import RepositorySerializer
import requests


class FetchReposView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        access_token = user.access_token

        response = requests.get(
            "https://api.github.com/user/repos",
            headers={"Authorization": f"token {access_token}"}
        )

        if response.status_code != 200:
            return Response({"error": response.json()}, status=response.status_code)

        repos = response.json()
        if not isinstance(repos, list):
            return Response({"error": "Unexpected response format"}, status=400)

        for repo in repos:
            Repository.objects.update_or_create(
                user=user,
                repo_name=repo["name"],
                defaults={
                    "description": repo.get("description") or "",
                    "metadata": repo
                }
            )

        serializer = RepositorySerializer(Repository.objects.filter(user=user), many=True)
        return Response(serializer.data)


class RepositoryListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        """List all repositories for the authenticated user"""
        repos = Repository.objects.filter(user=request.user)
        serializer = RepositorySerializer(repos, many=True)
        return Response(serializer.data)


class RepositoryDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get_repo(self, repo_id, user):
        """Helper method to get a repo and check ownership"""
        try:
            return Repository.objects.get(id=repo_id, user=user)
        except Repository.DoesNotExist:
            return None

    def get(self, request, repo_id):
        """Retrieve a specific repository"""
        repo = self.get_repo(repo_id, request.user)
        if not repo:
            return Response({"error": "Repository not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = RepositorySerializer(repo)
        return Response(serializer.data)

    def patch(self, request, repo_id):
        """Update a repository (e.g., toggle selected)"""
        repo = self.get_repo(repo_id, request.user)
        if not repo:
            return Response({"error": "Repository not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = RepositorySerializer(repo, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, repo_id):
        """Delete a repository"""
        repo = self.get_repo(repo_id, request.user)
        if not repo:
            return Response({"error": "Repository not found"}, status=status.HTTP_404_NOT_FOUND)
        repo.delete()
        return Response({"message": "Repository deleted successfully"}, status=status.HTTP_204_NO_CONTENT)