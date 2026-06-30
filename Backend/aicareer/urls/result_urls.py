from django.urls import path
from ..views.ResultView import ResultListView, ResultDetailView, TaskStatusView


urlpatterns = [
    path("results/", ResultListView.as_view(), name="result_list"),
    path("results/<int:result_id>/", ResultDetailView.as_view(), name="result_detail"),
    path("task/<str:task_id>/status/", TaskStatusView.as_view(), name="task_status"),
]
