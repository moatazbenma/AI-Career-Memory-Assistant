import requests
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from ..models import User
from ..serializers.user_serializer import UserSerializer

class GithubAuthView(APIView):
    def post(self, request):
        code = request.data.get("code")
        if not code:
            return Response({"error": "Missing code"}, status=status.HTTP_400_BAD_REQUEST)
        return self.exchange_code_for_token(code)
    
    def exchange_code_for_token(self, code):
        token_url = "https://github.com/login/oauth/access_token"
        response = requests.post(token_url, data={
            "client_id": settings.GITHUB_CLIENT_ID,
            "client_secret": settings.GITHUB_CLIENT_SECRET,
            "code": code
        }, headers={"Accept": "application/json"})

        token_data = response.json()
        access_token = token_data.get("access_token")
        
        if not access_token:
            return Response(
                {"error": "Failed to get access token", "details": token_data},
                status=status.HTTP_401_UNAUTHORIZED
            )

        # Fetch user info
        user_response = requests.get(
            "https://api.github.com/user",
            headers={"Authorization": f"token {access_token}"}
        )
        
        if user_response.status_code != 200:
            return Response(
                {"error": "Failed to fetch user info"},
                status=status.HTTP_401_UNAUTHORIZED
            )
        
        user_info = user_response.json()
        email = user_info.get("email") or f"{user_info['login']}@github.com"
        
        # Save or update user
        user, _ = User.objects.update_or_create(
            github_id=user_info["id"],
            defaults={
                "username": user_info["login"],
                "email": email,
                "access_token": access_token
            }
        )

        # Issue JWT
        refresh = RefreshToken.for_user(user)
        return Response({
            "refresh": str(refresh),
            "access": str(refresh.access_token)
        })


class CurrentUserView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        """Get current authenticated user's info"""
        serializer = UserSerializer(request.user)
        return Response(serializer.data)
        