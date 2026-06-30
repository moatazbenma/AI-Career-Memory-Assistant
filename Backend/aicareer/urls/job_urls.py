from django.urls import path
from ..views.JobView import JobListCreateView, JobDetailView


urlpatterns = [
    path("jobs/", JobListCreateView.as_view(), name="job_list_create"),
    path("jobs/<int:job_id>/", JobDetailView.as_view(), name="job_detail"),
]
