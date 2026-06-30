from rest_framework import serializers
from ..models import Analysis


class AnalysisSerializer(serializers.ModelSerializer):
    class Meta:
        model = Analysis
        fields = ['id', 'job', 'repo', 'status', 'created_at']
        read_only_fields = ['id', 'status', 'created_at']
