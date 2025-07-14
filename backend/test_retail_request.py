import requests

url = "http://127.0.0.1:8000/api/retail_predict/"

test_data = {
    "tenure": 12,
    "preferred_login_device": "Mobile Phone",
    "city_tier": 2,
    "warehouse_to_home": 5,
    "preferred_payment_mode": "Credit Card",
    "gender": "Female",
    "hour_spend_on_app": 3.5,
    "number_of_device_registered": 2,
    "prefered_order_cat": "Fashion",
    "satisfaction_score": 4,
    "marital_status": "Single",
    "number_of_address": 2,
    "complain": 0,
    "order_amount_hike_fromlast_year": 15.0,
    "coupon_used": 1,
    "order_count": 10,
    "day_since_last_order": 20,
    "cashback_amount": 50.0,
    "model_name": "random_forest"
}

response = requests.post(url, json=test_data)

print("Status Code:", response.status_code)
print("Response JSON:", response.json())
