from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from ..models import Analysis, Job, Repository, Result
from ..serializers.analysis_serializer import AnalysisSerializer
from ..serializers.result_serializer import ResultSerializer
from ..tasks import analyze_repository


class AnalysisCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        """Create a new analysis linking a job and repository"""
        job_id = request.data.get('job_id')
        repo_id = request.data.get('repo_id')

        # Validate job_id and repo_id are provided
        if not job_id or not repo_id:
            return Response(
                {"error": "job_id and repo_id are required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Verify job belongs to the user
        try:
            job = Job.objects.get(id=job_id, user=request.user)
        except Job.DoesNotExist:
            return Response(
                {"error": "Job not found or does not belong to you"},
                status=status.HTTP_404_NOT_FOUND
            )

        # Verify repo belongs to the user
        try:
            repo = Repository.objects.get(id=repo_id, user=request.user)
        except Repository.DoesNotExist:
            return Response(
                {"error": "Repository not found or does not belong to you"},
                status=status.HTTP_404_NOT_FOUND
            )

        # Check if analysis already exists for this job-repo pair
        existing = Analysis.objects.filter(job=job, repo=repo).first()
        if existing:
            return Response(
                {"error": "Analysis already exists for this job-repository pair"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Create the analysis
        analysis = Analysis.objects.create(job=job, repo=repo, status="pending")
        
        # Start the Celery task to analyze the repository
        task = analyze_repository.delay(analysis.id)
        
        # Create Result immediately with task ID so it's available right away
        result = Result.objects.create(
            analysis=analysis,
            task_id=task.id,
            star_bullets='',
            interview_questions='',
            summary=''
        )
        
        serializer = ResultSerializer(result)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class AnalysisListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        """List all analyses for the authenticated user"""
        analyses = Analysis.objects.filter(job__user=request.user)
        serializer = AnalysisSerializer(analyses, many=True)
        return Response(serializer.data)
