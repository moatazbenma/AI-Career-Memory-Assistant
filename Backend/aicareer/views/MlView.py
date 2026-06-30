from rest_framework.decorators import api_view
from rest_framework.response import Response

from ml.predictor import predict_career


@api_view(["POST"])
def predict_view(request):
    career = predict_career(request.data)

    return Response({
        "prediction": career
    })