import React, { useState, useRef } from "react";
import axios from "axios";
import Navbar from "./Navbar";

export default function ChurnPredictorTelecom() {
  const [formData, setFormData] = useState({
    gender: "Male",
    senior_citizen: "0",
    partner: "No",
    dependents: "No",
    tenure: "",
    phone_service: "Yes",
    multiple_lines: "No",
    internet_service: "DSL",
    online_security: "No",
    online_backup: "No",
    device_protection: "No",
    tech_support: "No",
    streaming_tv: "No",
    streaming_movies: "No",
    contract: "Month-to-month",
    paperless_billing: "Yes",
    payment_method: "Electronic check",
    monthly_charges: "",
    total_charges: "",
    model_name: "tele_gradient_boosting",
  });

  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const resultRef = useRef(null);

  const booleanToInt = (val) => (val === "Yes" ? 1 : 0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResult(null);
    setError(null);
    setLoading(true);

    try {
      const payload = {
        gender: formData.gender,
        senior_citizen: parseInt(formData.senior_citizen),
        partner: booleanToInt(formData.partner),
        dependents: booleanToInt(formData.dependents),
        tenure: parseInt(formData.tenure),
        phone_service: booleanToInt(formData.phone_service),
        multiple_lines: formData.multiple_lines === "Yes" ? 1 : 0,
        internet_service: formData.internet_service,
        online_security: formData.online_security === "Yes" ? 1 : 0,
        online_backup: formData.online_backup === "Yes" ? 1 : 0,
        device_protection: formData.device_protection === "Yes" ? 1 : 0,
        tech_support: formData.tech_support === "Yes" ? 1 : 0,
        streaming_tv: formData.streaming_tv === "Yes" ? 1 : 0,
        streaming_movies: formData.streaming_movies === "Yes" ? 1 : 0,
        contract: formData.contract,
        paperless_billing: booleanToInt(formData.paperless_billing),
        payment_method: formData.payment_method,
        monthly_charges: parseFloat(formData.monthly_charges),
        total_charges: parseFloat(formData.total_charges),
        model_name: formData.model_name,
      };

      const res = await axios.post("http://127.0.0.1:8000/api/predict-telecom/", payload);
      setResult(res.data);
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Prediction failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: "Segoe UI, sans-serif", minHeight: "100vh", backgroundColor: "#f5f7fa" }}>
      <Navbar />

      <div style={{
        maxWidth: "1200px",
        margin: "2rem auto",
        backgroundColor: "white",
        boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
        borderRadius: "10px",
        padding: "2rem",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "2rem"
      }}>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <h2 style={{ marginBottom: "1rem", color: "#2c3e50" }}>Customer Information</h2>

          {[{ name: "monthly_charges", label: "Monthly Charges" },
            { name: "total_charges", label: "Total Charges" },
            { name: "tenure", label: "Tenure" }].map(({ name, label }) => (
            <div key={name}>
              <label>{label}</label>
              <input
                type="number"
                name={name}
                value={formData[name]}
                onChange={handleChange}
                required
                style={{ width: "100%", padding: "0.5rem", borderRadius: "6px", border: "1px solid #ccc" }}
              />
            </div>
          ))}

          {[
            { name: "gender", label: "Gender", options: ["Male", "Female"] },
            { name: "senior_citizen", label: "Senior Citizen", options: ["0", "1"] },
            { name: "partner", label: "Partner", options: ["Yes", "No"] },
            { name: "dependents", label: "Dependents", options: ["Yes", "No"] },
            { name: "phone_service", label: "Phone Service", options: ["Yes", "No"] },
            { name: "multiple_lines", label: "Multiple Lines", options: ["Yes", "No", "No phone service"] },
            { name: "internet_service", label: "Internet Service", options: ["DSL", "Fiber optic", "No"] },
            { name: "online_security", label: "Online Security", options: ["Yes", "No", "No internet service"] },
            { name: "online_backup", label: "Online Backup", options: ["Yes", "No", "No internet service"] },
            { name: "device_protection", label: "Device Protection", options: ["Yes", "No", "No internet service"] },
            { name: "tech_support", label: "Tech Support", options: ["Yes", "No", "No internet service"] },
            { name: "streaming_tv", label: "Streaming TV", options: ["Yes", "No", "No internet service"] },
            { name: "streaming_movies", label: "Streaming Movies", options: ["Yes", "No", "No internet service"] },
            { name: "contract", label: "Contract", options: ["Month-to-month", "One year", "Two year"] },
            { name: "paperless_billing", label: "Paperless Billing", options: ["Yes", "No"] },
            { name: "payment_method", label: "Payment Method", options: [
                "Electronic check", "Mailed check", "Bank transfer (automatic)", "Credit card (automatic)"
              ]
            },
            { name: "model_name", label: "Model", options: [
                "tele_gradient_boosting", 
                "tele_logistic_regression", 
                "tele_decision_tree", 
                "tele_xgboost",
                "tele_random_forest"
              ] 
            }
          ].map(({ name, label, options }) => (
            <div key={name}>
              <label>{label}</label>
              <select
                name={name}
                value={formData[name]}
                onChange={handleChange}
                required
                style={{ width: "100%", padding: "0.5rem", borderRadius: "6px", border: "1px solid #ccc" }}
              >
                <option value="">Select...</option>
                {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>
          ))}

          <button type="submit" disabled={loading} style={{
            backgroundColor: "#2980b9",
            color: "white",
            padding: "0.75rem",
            border: "none",
            borderRadius: "6px",
            fontWeight: "bold"
          }}>
            {loading ? "Predicting..." : "Predict Churn"}
          </button>

          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>

        {/* Result Section */}
        <div ref={resultRef}>
          {result ? (
            <>
              <h3 style={{ color: "#2c3e50" }}>Prediction Results</h3>
              <div style={{ backgroundColor: "#f0f4f7", padding: "1rem", borderRadius: "8px", marginBottom: "1rem" }}>
                <strong>Churn Probability:</strong>
                <div style={{
                  fontSize: "2rem",
                  color: result.probability > 0.7 ? "#e74c3c" : result.probability > 0.4 ? "#f39c12" : "#27ae60"
                }}>
                  {(result.probability * 100).toFixed(0)}%
                </div>
              </div>
              <div style={{ backgroundColor: "#f0f4f7", padding: "1rem", borderRadius: "8px", marginBottom: "1rem" }}>
                <strong>Risk Level:</strong>
                <div style={{
                  fontSize: "1.2rem",
                  color: result.risk_level === "High" ? "#e74c3c" : result.risk_level === "Medium" ? "#f39c12" : "#27ae60"
                }}>
                  {result.risk_level}
                </div>
              </div>
              <div style={{ backgroundColor: "#f0f4f7", padding: "1rem", borderRadius: "8px" }}>
                <strong>Recommendation:</strong>
                <p>{result.recommendation}</p>
              </div>
            </>
          ) : (
            <p style={{ color: "#7f8c8d" }}>Submit the form to get prediction</p>
          )}
        </div>
      </div>
    </div>
  );
}
