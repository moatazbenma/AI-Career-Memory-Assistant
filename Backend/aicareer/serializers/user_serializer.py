from rest_framework import serializers
from ..models import User



class UserSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(source='date_joined', read_only=True)
    
    class Meta:
        model = User
        fields = ['id', 'github_id', 'username', 'email', 'created_at']