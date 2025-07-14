import requests

URL = "http://127.0.0.1:8000/api/predict-telecom/"  # Adjust if using a different host/port

samples = [
    # 1️⃣ Actual: No
    {
        "gender": "Male", "senior_citizen": 1, "partner": 1, "dependents": 0,
        "tenure": 61, "phone_service": 1, "multiple_lines": 1, "internet_service": "No",
        "online_security": 0, "online_backup": 0, "device_protection": 0, "tech_support": 0,
        "streaming_tv": 0, "streaming_movies": 0, "contract": "Two year",
        "paperless_billing": 0, "payment_method": "Bank transfer (automatic)",
        "monthly_charges": 25.0, "total_charges": 1501.75, "model_name": "tele_gradient_boosting"
    },

    # 2️⃣ Actual: No
    {
        "gender": "Female", "senior_citizen": 0, "partner": 0, "dependents": 0,
        "tenure": 19, "phone_service": 1, "multiple_lines": 1, "internet_service": "No",
        "online_security": 0, "online_backup": 0, "device_protection": 0, "tech_support": 0,
        "streaming_tv": 0, "streaming_movies": 0, "contract": "Month-to-month",
        "paperless_billing": 0, "payment_method": "Bank transfer (automatic)",
        "monthly_charges": 24.7, "total_charges": 465.85, "model_name": "tele_gradient_boosting"
    },

    # 3️⃣ Actual: Yes
    {
        "gender": "Male", "senior_citizen": 0, "partner": 1, "dependents": 0,
        "tenure": 13, "phone_service": 1, "multiple_lines": 1, "internet_service": "Fiber optic",
        "online_security": 0, "online_backup": 0, "device_protection": 1, "tech_support": 0,
        "streaming_tv": 1, "streaming_movies": 1, "contract": "Month-to-month",
        "paperless_billing": 1, "payment_method": "Credit card (automatic)",
        "monthly_charges": 102.25, "total_charges": 1359.0, "model_name": "tele_gradient_boosting"
    },

    # 4️⃣ Actual: Yes
    {
        "gender": "Female", "senior_citizen": 0, "partner": 0, "dependents": 0,
        "tenure": 1, "phone_service": 1, "multiple_lines": 0, "internet_service": "Fiber optic",
        "online_security": 0, "online_backup": 0, "device_protection": 0, "tech_support": 0,
        "streaming_tv": 0, "streaming_movies": 0, "contract": "Month-to-month",
        "paperless_billing": 1, "payment_method": "Electronic check",
        "monthly_charges": 70.35, "total_charges": 70.35, "model_name": "tele_gradient_boosting"
    },

    # 5️⃣ Actual: No
    {
        "gender": "Male", "senior_citizen": 0, "partner": 1, "dependents": 1,
        "tenure": 58, "phone_service": 1, "multiple_lines": 1, "internet_service": "DSL",
        "online_security": 1, "online_backup": 1, "device_protection": 1, "tech_support": 1,
        "streaming_tv": 0, "streaming_movies": 0, "contract": "One year",
        "paperless_billing": 0, "payment_method": "Credit card (automatic)",
        "monthly_charges": 56.95, "total_charges": 3320.75, "model_name": "tele_gradient_boosting"
    },

    # 6️⃣ Actual: Yes
    {
        "gender": "Female", "senior_citizen": 0, "partner": 0, "dependents": 0,
        "tenure": 2, "phone_service": 1, "multiple_lines": 0, "internet_service": "Fiber optic",
        "online_security": 0, "online_backup": 0, "device_protection": 0, "tech_support": 0,
        "streaming_tv": 1, "streaming_movies": 1, "contract": "Month-to-month",
        "paperless_billing": 1, "payment_method": "Electronic check",
        "monthly_charges": 89.1, "total_charges": 183.05, "model_name": "tele_gradient_boosting"
    },

    # 7️⃣ Actual: No
    {
        "gender": "Male", "senior_citizen": 0, "partner": 1, "dependents": 0,
        "tenure": 25, "phone_service": 1, "multiple_lines": 1, "internet_service": "DSL",
        "online_security": 1, "online_backup": 1, "device_protection": 1, "tech_support": 0,
        "streaming_tv": 1, "streaming_movies": 0, "contract": "One year",
        "paperless_billing": 0, "payment_method": "Mailed check",
        "monthly_charges": 75.25, "total_charges": 1805.5, "model_name": "tele_gradient_boosting"
    },

    # 8️⃣ Actual: Yes
    {
        "gender": "Female", "senior_citizen": 0, "partner": 0, "dependents": 0,
        "tenure": 1, "phone_service": 1, "multiple_lines": 0, "internet_service": "DSL",
        "online_security": 0, "online_backup": 0, "device_protection": 0, "tech_support": 0,
        "streaming_tv": 0, "streaming_movies": 0, "contract": "Month-to-month",
        "paperless_billing": 1, "payment_method": "Electronic check",
        "monthly_charges": 53.85, "total_charges": 53.85, "model_name": "tele_gradient_boosting"
    },

    # 9️⃣ Actual: No
    {
        "gender": "Male", "senior_citizen": 1, "partner": 1, "dependents": 1,
        "tenure": 72, "phone_service": 1, "multiple_lines": 1, "internet_service": "DSL",
        "online_security": 1, "online_backup": 1, "device_protection": 1, "tech_support": 1,
        "streaming_tv": 1, "streaming_movies": 1, "contract": "Two year",
        "paperless_billing": 0, "payment_method": "Bank transfer (automatic)",
        "monthly_charges": 85.45, "total_charges": 6145.75, "model_name": "tele_gradient_boosting"
    },

    # 🔟 Actual: Yes
    {
        "gender": "Female", "senior_citizen": 0, "partner": 0, "dependents": 0,
        "tenure": 5, "phone_service": 1, "multiple_lines": 1, "internet_service": "Fiber optic",
        "online_security": 0, "online_backup": 0, "device_protection": 0, "tech_support": 0,
        "streaming_tv": 1, "streaming_movies": 1, "contract": "Month-to-month",
        "paperless_billing": 1, "payment_method": "Mailed check",
        "monthly_charges": 95.65, "total_charges": 470.15, "model_name": "tele_gradient_boosting"
    }
]

for i, sample in enumerate(samples, 1):
    response = requests.post(URL, json=sample)
    print(f"🔹 Sample {i} | Actual: {'Yes' if i in [3, 4, 6, 8, 10] else 'No'}")
    print("Status Code:", response.status_code)
    print("Prediction:", response.json())
    print("-" * 60)
