from django.urls import path
from ..views.AnalysisView import AnalysisCreateView, AnalysisListView


urlpatterns = [
    path("analysis/", AnalysisListView.as_view(), name="analysis_list"),
    path("analysis/create/", AnalysisCreateView.as_view(), name="analysis_create"),
]
