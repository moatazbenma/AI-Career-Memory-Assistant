from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from celery.result import AsyncResult
from ..models import Result, Analysis
from ..serializers.result_serializer import ResultSerializer


class ResultListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        """List all results for the user's analyses"""
        analyses = Analysis.objects.filter(job__user=request.user)
        results = Result.objects.filter(analysis__in=analyses)
        serializer = ResultSerializer(results, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ResultDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, result_id):
        """Get a specific result with task status"""
        try:
            result = Result.objects.get(id=result_id, analysis__job__user=request.user)
        except Result.DoesNotExist:
            return Response(
                {"error": "Result not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = ResultSerializer(result)
        response_data = serializer.data

        # Get Celery task status if task_id exists
        if result.task_id:
            task = AsyncResult(result.task_id)
            response_data['task_status'] = task.state
            response_data['task_ready'] = task.ready()

        return Response(response_data, status=status.HTTP_200_OK)

    def delete(self, request, result_id):
        """Delete a specific result"""
        try:
            result = Result.objects.get(id=result_id, analysis__job__user=request.user)
        except Result.DoesNotExist:
            return Response(
                {"error": "Result not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        result.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class TaskStatusView(APIView):
    """Check status of a Celery task"""
    permission_classes = [IsAuthenticated]

    def get(self, request, task_id):
        """Get Celery task status"""
        task = AsyncResult(task_id)
        return Response({
            'task_id': task_id,
            'status': task.state,
            'ready': task.ready(),
            'result': task.result if task.ready() else None
        })
