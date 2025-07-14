from django.urls import path
from .views import PredictAPIView, TelecomPredictAPIView, RetailPredictAPIView

urlpatterns = [
    path('api/predict/', PredictAPIView.as_view(), name='predict'),
    path('api/predict-telecom/', TelecomPredictAPIView.as_view(), name='predict-telecom'),
    path('api/retail_predict/', RetailPredictAPIView.as_view(), name='retail_predict'),
]
