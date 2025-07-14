import requests

url = 'http://127.0.0.1:8000/api/predict/' 

checking = {
    "credit_score": "608",
    "geography": "Spain",
    "gender": "Female",
    "age": "41",
    "tenure": "1",
    "balance": "83808",
    "num_of_products": "1",
    "has_cr_card": True,
    "is_active_member": True,
    "estimated_salary": "112542.6",
    "model_name": "random_forest"
}

response = requests.post(url, json=checking)

print("Status Code:", response.status_code)
print("Response JSON:", response.json())
