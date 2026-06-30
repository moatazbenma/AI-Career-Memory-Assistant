from rest_framework import serializers
from ..models import Result, Analysis, Job, Repository


class JobNestedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = ['id', 'job_title']


class RepositoryNestedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Repository
        fields = ['id', 'repo_name']


class ResultSerializer(serializers.ModelSerializer):
    job = serializers.SerializerMethodField()
    repository = serializers.SerializerMethodField()
    task_status = serializers.SerializerMethodField()
    
    class Meta:
        model = Result
        fields = ['id', 'analysis', 'task_id', 'star_bullets', 'interview_questions', 'summary', 'created_at', 'job', 'repository', 'task_status']
        read_only_fields = ['id', 'created_at', 'task_status']

    def get_job(self, obj):
        """Get the job from the related analysis"""
        try:
            job = obj.analysis.job
            return {'id': job.id, 'title': job.job_title}
        except:
            return None

    def get_repository(self, obj):
        """Get the repository from the related analysis"""
        try:
            repo = obj.analysis.repo
            return {'id': repo.id, 'name': repo.repo_name}
        except:
            return None

    def get_task_status(self, obj):
        """Get Celery task status"""
        from celery.result import AsyncResult
        if obj.task_id:
            task = AsyncResult(obj.task_id)
            return task.state
        return 'pending'
