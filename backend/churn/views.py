import os
import time
import traceback
import joblib
import numpy as np

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from django.conf import settings
from .models import Prediction, TelecomPrediction
from .models import TelecomPrediction
from .models import RetailPrediction
from sklearn.preprocessing import LabelEncoder

# Cache models
model_cache = {}

# ======================
# BANKING PREDICTION
# ======================
class PredictAPIView(APIView):
    def post(self, request):
        try:
            data = request.data

            # Input validation
            credit_score = int(data["credit_score"])
            if not (300 <= credit_score <= 900):
                return Response({"error": "Credit score must be between 300 and 900"}, status=400)

            age = int(data["age"])
            if not (18 <= age <= 100):
                return Response({"error": "Age must be between 18 and 100"}, status=400)

            tenure = int(data["tenure"])
            if not (0 <= tenure <= 20):
                return Response({"error": "Tenure must be between 0 and 20"}, status=400)

            balance = float(data["balance"])
            if balance < 0:
                return Response({"error": "Balance must be non-negative"}, status=400)

            num_products = int(data["num_of_products"])
            if not (1 <= num_products <= 5):
                return Response({"error": "Number of products must be between 1 and 5"}, status=400)

            has_cr_card = int(data["has_cr_card"])
            is_active_member = int(data["is_active_member"])
            estimated_salary = float(data["estimated_salary"])
            geography = data["geography"]
            gender = data["gender"]
            model_name = data["model_name"]

            input_data = [[
                credit_score,
                geography,
                gender,
                age,
                tenure,
                balance,
                num_products,
                has_cr_card,
                is_active_member,
                estimated_salary,
            ]]

            # Load model from backend/models/
            model_path = os.path.join(settings.BASE_DIR, 'backend', 'models', f'{model_name}.sav')
            if not os.path.exists(model_path):
                return Response({"error": f"Model '{model_name}.sav' not found."}, status=404)

            if model_name not in model_cache:
                model_cache[model_name] = joblib.load(model_path)
            model = model_cache[model_name]

            start = time.time()
            prediction = model.predict(input_data)[0]
            probability = model.predict_proba(input_data)[0][1] if hasattr(model, "predict_proba") else 0.5
            print("Banking prediction time:", round(time.time() - start, 4), "seconds")

            churn_prob = round(probability * 100)
            status_str = "Exit" if prediction == 1 else "Stay"

            if churn_prob > 70:
                risk = "High"
                recommendation = "High risk of churn. Immediate intervention required with personalized offers."
            elif churn_prob > 40:
                risk = "Medium"
                recommendation = "Moderate risk. Consider loyalty programs and improved customer service."
            else:
                risk = "Low"
                recommendation = "Customer likely to stay. Continue regular engagement."

            # Save to DB
            Prediction.objects.create(
                credit_score=credit_score,
                geography=geography,
                gender=gender,
                age=age,
                tenure=tenure,
                balance=balance,
                num_of_products=num_products,
                has_cr_card=bool(has_cr_card),
                is_active_member=bool(is_active_member),
                estimated_salary=estimated_salary,
                model_used=model_name,
                prediction_result=status_str
            )

            return Response({
                "result": status_str,
                "probability": churn_prob,
                "risk_level": risk,
                "recommendation": recommendation
            })

        except Exception as e:
            traceback.print_exc()
            return Response({"error": str(e)}, status=500)


# ======================
# TELECOM PREDICTION
# ======================
# Model cache to prevent reloading
model_cache = {}

class TelecomPredictAPIView(APIView):
    def post(self, request):
        try:
            data = request.data
            model_name = data.get("model_name", "tele_gradient_boosting")

            #  Manual One-Hot Encoding — Exactly 24 features
            def preprocess_input(data):
                features = []
            
                # 15 numeric / binary
                features.append(int(data["senior_citizen"]))
                features.append(int(data["partner"]))
                features.append(int(data["dependents"]))
                features.append(int(data["tenure"]))
                features.append(int(data["phone_service"]))
                features.append(int(data["multiple_lines"]))
                features.append(int(data["online_security"]))
                features.append(int(data["online_backup"]))
                features.append(int(data["device_protection"]))
                features.append(int(data["tech_support"]))
                features.append(int(data["streaming_tv"]))
                features.append(int(data["streaming_movies"]))
                features.append(int(data["paperless_billing"]))
                features.append(float(data["monthly_charges"]))
                features.append(float(data["total_charges"]))
            
                # gender: only "Female" dummy (drop Male to avoid dummy variable trap)
                features.append(1 if data["gender"] == "Female" else 0) 
            
                # InternetService: DSL, Fiber optic (drop "No")
                for val in ["DSL", "Fiber optic"]:
                    features.append(1 if data["internet_service"] == val else 0)
            
                # Contract: One year, Two year (drop "Month-to-month")
                for val in ["One year", "Two year"]:
                    features.append(1 if data["contract"] == val else 0)
            
                # PaymentMethod: all 4 categories included
                for val in [
                    "Electronic check",
                    "Mailed check",
                    "Bank transfer (automatic)",
                    "Credit card (automatic)"
                ]:
                    features.append(1 if data["payment_method"] == val else 0)
            
                return features  
            


            #  Load model from tele_models
            model_path = os.path.join(settings.BASE_DIR, "tele_models", f"{model_name}.sav")
            if not os.path.exists(model_path):
                return Response({"error": f"Model '{model_name}.sav' not found."}, status=404)

            if model_name not in model_cache:
                model_cache[model_name] = joblib.load(model_path)
            model = model_cache[model_name]

            #  Prepare input
            input_data = preprocess_input(data)

            if len(input_data) != 24:
                return Response({"error": f"Input features mismatch: got {len(input_data)} features, expected 24"}, status=400)

            X = np.array(input_data).reshape(1, -1)

            #  Predict
            pred_proba = model.predict_proba(X)[0][1]
            pred_class = model.predict(X)[0]

            risk = "High" if pred_proba > 0.7 else "Medium" if pred_proba > 0.4 else "Low"
            suggestion = (
                "Immediate retention action required." if risk == "High"
                else "Monitor customer satisfaction." if risk == "Medium"
                else "Customer likely to stay."
            )

            #  Save to DB
            TelecomPrediction.objects.create(
                gender=data['gender'],
                senior_citizen=data['senior_citizen'],
                partner=data['partner'],
                dependents=data['dependents'],
                tenure=data['tenure'],
                phone_service=data['phone_service'],
                multiple_lines=data['multiple_lines'],
                internet_service=data['internet_service'],
                online_security=data['online_security'],
                online_backup=data['online_backup'],
                device_protection=data['device_protection'],
                tech_support=data['tech_support'],
                streaming_tv=data['streaming_tv'],
                streaming_movies=data['streaming_movies'],
                contract=data['contract'],
                paperless_billing=data['paperless_billing'],
                payment_method=data['payment_method'],
                monthly_charges=data['monthly_charges'],
                total_charges=data['total_charges'],
                predicted_churn="Yes" if pred_class == 1 else "No",
                churn_probability=round(pred_proba, 2),
                model_used=model_name
            )

            return Response({
                "prediction": "Yes" if pred_class == 1 else "No",
                "probability": round(pred_proba, 2),
                "risk_level": risk,
                "recommendation": suggestion
            })

        except Exception as e:
            traceback.print_exc()
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class RetailPredictAPIView(APIView):
    def post(self, request):
        try:
            data = request.data
            model_name = data.get("model_name", "retail_random_forest")

            def preprocess_input(data):
                # Maps as used during training
                gender_map = {"Male": 0, "Female": 1}
                marital_map = {"Single": 0, "Married": 1, "Divorced": 2}
                device_map = {"Mobile Phone": 0, "Phone": 1, "Computer": 2}
                payment_map = {
                    "UPI": 0,
                    "Cash on Delivery": 1,
                    "Debit Card": 2,
                    "Credit Card": 3,
                    "E wallet": 4,
                    "Net Banking": 5,
                }
                order_cat_map = {
                    "Laptop & Accessory": 0,
                    "Mobile": 1,
                    "Others": 2,
                    "Fashion": 3,
                    "Grocery": 4,
                }

                return [[
                    int(data["tenure"]),
                    device_map.get(data["preferred_login_device"], 0),
                    int(data["city_tier"]),
                    int(data["warehouse_to_home"]),
                    payment_map.get(data["preferred_payment_mode"], 0),
                    gender_map.get(data["gender"], 0),
                    float(data["hour_spend_on_app"]),
                    int(data["number_of_device_registered"]),
                    order_cat_map.get(data["prefered_order_cat"], 0),
                    int(data["satisfaction_score"]),
                    marital_map.get(data["marital_status"], 0),
                    int(data["number_of_address"]),
                    int(data["complain"]),
                    float(data["order_amount_hike_fromlast_year"]),
                    int(data["coupon_used"]),
                    int(data["order_count"]),
                    int(data["day_since_last_order"]),
                    float(data["cashback_amount"]),
                ]]

            # Load model
            model_path = os.path.join(settings.BASE_DIR, "retail_models", f"{model_name}.sav")
            if not os.path.exists(model_path):
                return Response({"error": f"Model '{model_name}.sav' not found."}, status=404)

            if model_name not in model_cache:
                model_cache[model_name] = joblib.load(model_path)
            model = model_cache[model_name]

            input_data = preprocess_input(data)

            if len(input_data[0]) != 18:
                return Response({"error": f"Expected 18 features, got {len(input_data[0])}"}, status=400)

            pred = model.predict(input_data)[0]
            proba = model.predict_proba(input_data)[0][1] if hasattr(model, "predict_proba") else 0.5

            churn_prob = round(proba * 100)
            status_str = "Churn" if pred == 1 else "Stay"

            # Risk logic
            if churn_prob > 70:
                risk = "High"
                recommendation = "High churn risk. Offer discounts or loyalty points."
            elif churn_prob > 40:
                risk = "Medium"
                recommendation = "Moderate churn risk. Encourage engagement and feedback."
            else:
                risk = "Low"
                recommendation = "Customer is likely to stay."

            # Save to DB
            RetailPrediction.objects.create(
                tenure=data["tenure"],
                preferred_login_device=data["preferred_login_device"],
                city_tier=data["city_tier"],
                warehouse_to_home=data["warehouse_to_home"],
                preferred_payment_mode=data["preferred_payment_mode"],
                gender=data["gender"],
                hour_spend_on_app=data["hour_spend_on_app"],
                number_of_device_registered=data["number_of_device_registered"],
                prefered_order_cat=data["prefered_order_cat"],
                satisfaction_score=data["satisfaction_score"],
                marital_status=data["marital_status"],
                number_of_address=data["number_of_address"],
                complain=data["complain"],
                order_amount_hike_fromlast_year=data["order_amount_hike_fromlast_year"],
                coupon_used=data["coupon_used"],
                order_count=data["order_count"],
                day_since_last_order=data["day_since_last_order"],
                cashback_amount=data["cashback_amount"],
                prediction_result=status_str,
                churn_probability=churn_prob,
                model_used=model_name,
            )

            return Response({
                "prediction": status_str,
                "probability": churn_prob,
                "risk_level": risk,
                "recommendation": recommendation
            })

        except Exception as e:
            traceback.print_exc()
            return Response({"error": str(e)}, status=500)
