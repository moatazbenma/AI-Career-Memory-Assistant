from rest_framework import serializers
from ..models import Job


class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = ['id', 'job_title', 'job_description', 'created_at']
        read_only_fields = ['id', 'created_at']
