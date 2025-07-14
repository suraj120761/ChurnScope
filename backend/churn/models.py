from django.db import models

class Prediction(models.Model):
    credit_score = models.IntegerField()
    geography = models.CharField(max_length=100)
    gender = models.CharField(max_length=10)
    age = models.IntegerField()
    tenure = models.IntegerField()
    balance = models.FloatField()
    num_of_products = models.IntegerField()
    has_cr_card = models.BooleanField()
    is_active_member = models.BooleanField()
    estimated_salary = models.FloatField()
    model_used = models.CharField(max_length=100)
    prediction_result = models.CharField(max_length=10)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.geography} - {self.prediction_result} ({self.model_used})"


class TelecomPrediction(models.Model):
    GENDER_CHOICES = (
        ('Male', 'Male'),
        ('Female', 'Female'),
    )

    INTERNET_CHOICES = (
        ('No', 'No'),
        ('DSL', 'DSL'),
        ('Fiber optic', 'Fiber optic'),
    )

    CONTRACT_CHOICES = (
        ('Month-to-month', 'Month-to-month'),
        ('One year', 'One year'),
        ('Two year', 'Two year'),
    )

    PAYMENT_CHOICES = (
        ('Electronic check', 'Electronic check'),
        ('Mailed check', 'Mailed check'),
        ('Bank transfer (automatic)', 'Bank transfer (automatic)'),
        ('Credit card (automatic)', 'Credit card (automatic)'),
    )

    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
    senior_citizen = models.BooleanField()
    partner = models.BooleanField()
    dependents = models.BooleanField()
    tenure = models.IntegerField()
    phone_service = models.BooleanField()
    multiple_lines = models.BooleanField()
    internet_service = models.CharField(max_length=20, choices=INTERNET_CHOICES)
    online_security = models.BooleanField()
    online_backup = models.BooleanField()
    device_protection = models.BooleanField()
    tech_support = models.BooleanField()
    streaming_tv = models.BooleanField()
    streaming_movies = models.BooleanField()
    contract = models.CharField(max_length=20, choices=CONTRACT_CHOICES)
    paperless_billing = models.BooleanField()
    payment_method = models.CharField(max_length=30, choices=PAYMENT_CHOICES)
    monthly_charges = models.FloatField()
    total_charges = models.FloatField()
    
    # ✅ NEW FIELDS WITH DEFAULTS
    predicted_churn = models.CharField(max_length=10, default="No")
    churn_probability = models.FloatField(default=0.0)
    model_used = models.CharField(max_length=50, default="tele_gradient_boosting")
    
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.gender} - {self.predicted_churn} ({self.model_used})"

# =======================
# RETAIL PREDICTION MODEL
# =======================


class RetailPrediction(models.Model):
    tenure = models.IntegerField(default=0)
    preferred_login_device = models.CharField(max_length=50, default="Mobile Phone")
    city_tier = models.IntegerField(default=1)
    warehouse_to_home = models.IntegerField(default=0)
    preferred_payment_mode = models.CharField(max_length=50, default="Cash on Delivery")
    gender = models.CharField(max_length=10, default="Male")
    hour_spend_on_app = models.FloatField(default=1.0)
    number_of_device_registered = models.IntegerField(default=1)
    prefered_order_cat = models.CharField(max_length=50, default="Others")
    satisfaction_score = models.IntegerField(default=3)
    marital_status = models.CharField(max_length=20, default="Single")
    number_of_address = models.IntegerField(default=1)
    complain = models.IntegerField(default=0)
    order_amount_hike_fromlast_year = models.FloatField(default=0.0)
    coupon_used = models.IntegerField(default=0)
    order_count = models.IntegerField(default=1)
    day_since_last_order = models.IntegerField(default=30)
    cashback_amount = models.FloatField(default=0.0)

    prediction_result = models.CharField(max_length=10, default="Pending")

    churn_probability = models.FloatField(default=0.0)
    model_used = models.CharField(max_length=100, default="retail_model")
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.gender} - {self.prediction_result}"
