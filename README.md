# ChurnScope – Full Stack Churn Prediction App

ChurnScope is an end-to-end machine learning web application that predicts customer churn across three industries: **Telecom**, **Retail**, and **Banking**.

Built with a **React frontend** and a **Django REST backend**, the app provides real-time predictions using trained ML models. Each model was built, evaluated, and saved for integration with the backend API.

---

## Project Overview

Customer churn is a critical metric for many industries. This app provides:

- Predictions for whether a customer will churn
- Separate models and inputs for **Telecom**, **Retail**, and **Banking**
- Backend preprocessing for consistent feature formatting
- Real-time API inference with user-friendly UI

---

## Project Structure
ChurnScope/
├── churn-frontend/ # React app (Frontend)
│ ├── public/
│ ├── src/
│ └── package.json
│
├── backend/ # Django backend
│ ├── models/ # Banking models
│ ├── tele_models/ # Telecom models (.sav)
│ ├── retail_models/ # Retail models (.sav)
│ ├── views.py # API logic for predictions
│ └── urls.py, settings.py
│
├── saved_notebooks/ # Jupyter notebooks (EDA, training)
├── .gitignore
└── README.md


> ❌ `node_modules/` and `venv/` are excluded via `.gitignore` to avoid large/unnecessary files in the repo.

---

## ⚙️ Tech Stack

| Layer       | Tech Used                  |
|-------------|----------------------------|
| Frontend    | React, HTML, CSS, JavaScript |
| Backend     | Django, Django REST Framework |
| ML Models   | Scikit-learn, Pandas, SMOTE |
| Deployment  | GitHub (optional: Render, Heroku, Railway) |

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/suraj120761/ChurnScope.git
cd ChurnScope


2. Start Backend (Django)
Make sure Python and pip are installed.

cd backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows

pip install -r requirements.txt
python manage.py runserver
Your Django server should be running at http://127.0.0.1:8000/

3. Start Frontend (React)
Make sure Node.js and npm are installed.

cd churn-frontend
npm install
npm start
Your React app will open at http://localhost:3000/

API Endpoints
Endpoint	Description
POST /predict/telecom	Telecom churn prediction
POST /predict/retail	Retail churn prediction
POST /predict/banking	Banking churn prediction

Each endpoint expects JSON input with specific customer details.

Machine Learning saved in .sav models


<img width="1345" height="643" alt="image" src="https://github.com/user-attachments/assets/cac10d5b-1aa8-40f1-a1a8-9a1ca5d0b452" />
<img width="1339" height="640" alt="image" src="https://github.com/user-attachments/assets/3908f5a4-6612-4a18-9b81-f58560ed47e3" />
<img width="1339" height="640" alt="image" src="https://github.com/user-attachments/assets/3a398ac9-4d4c-419f-9c22-3a2aa93b2fe5" />
<img width="1338" height="642" alt="image" src="https://github.com/user-attachments/assets/3262afa3-de78-4391-85db-99a55d36bf82" />
<img width="1339" height="638" alt="image" src="https://github.com/user-attachments/assets/b06775cf-42d5-465e-9135-2a09d1785dfa" />




