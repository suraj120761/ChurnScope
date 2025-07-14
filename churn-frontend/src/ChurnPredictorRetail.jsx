import React, { useState, useRef } from "react";
import axios from "axios";

export default function ChurnPredictorRetail() {
  const [formData, setFormData] = useState({
    customer_id: "",
    gender: "",
    age: "",
    location: "",
    membership_status: "",
    avg_transaction_value: "",
    purchase_frequency: "",
    recency_days: "",
    total_spent: "",
    preferred_category: "",
    discount_usage: "",
    is_loyalty_member: "",
    model_name: "retail_random_forest",
  });

  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const resultRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResult(null);
    setError(null);
    setLoading(true);

    const payload = {
      customer_id: formData.customer_id,
      gender: formData.gender,
      age: parseInt(formData.age),
      location: formData.location,
      membership_status: formData.membership_status,
      avg_transaction_value: parseFloat(formData.avg_transaction_value),
      purchase_frequency: parseFloat(formData.purchase_frequency),
      recency_days: parseInt(formData.recency_days),
      total_spent: parseFloat(formData.total_spent),
      preferred_category: formData.preferred_category,
      discount_usage: formData.discount_usage === "yes",
      is_loyalty_member: formData.is_loyalty_member === "yes",
      model_name: formData.model_name,
    };

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/retail_predict/", payload);
      setResult(res.data);
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (err) {
      setError("Prediction failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", fontFamily: "Segoe UI, sans-serif", backgroundColor: "#f2f6f9" }}>
      <nav style={{ backgroundColor: "#2c3e50", padding: "1rem 2rem" }}>
        <div style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <h1 style={{ color: "white", fontSize: "1.5rem" }}>Retail Churn Prediction</h1>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            {["Home", "Banking", "Telecom", "Retail"].map((item, idx) => (
              <a key={idx} href={`/${item.toLowerCase()}`} style={{ color: "white", textDecoration: "none" }}>
                {item}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        maxWidth: "1200px",
        margin: "2rem auto",
        backgroundColor: "#ffffff",
        boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
        borderRadius: "12px",
        overflow: "hidden"
      }}>
        {/* Form Section */}
        <form onSubmit={handleSubmit} style={{
          padding: "2rem",
          backgroundColor: "#f9f9f9",
          display: "flex",
          flexDirection: "column",
          gap: "1rem"
        }}>
          <h3 style={{ marginBottom: "1rem", color: "#2c3e50" }}>Customer Information</h3>

          {/* Text and number inputs */}
          {[
            { name: "customer_id", label: "Customer ID" },
            { name: "age", label: "Age", type: "number" },
            { name: "avg_transaction_value", label: "Avg. Transaction Value", type: "number" },
            { name: "purchase_frequency", label: "Purchase Frequency", type: "number" },
            { name: "recency_days", label: "Days Since Last Purchase", type: "number" },
            { name: "total_spent", label: "Total Spent", type: "number" },
            { name: "location", label: "Location" },
          ].map(({ name, label, type = "text" }) => (
            <div key={name}>
              <label style={{ fontWeight: "bold" }}>{label}:</label>
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  border: "1px solid #ccc",
                  borderRadius: "6px",
                  fontSize: "1rem"
                }}
              />
            </div>
          ))}

          {/* Select inputs */}
          {[
            { name: "gender", label: "Gender", options: ["Male", "Female"] },
            { name: "membership_status", label: "Membership Status", options: ["None", "Silver", "Gold"] },
            { name: "preferred_category", label: "Preferred Category", options: ["Electronics", "Fashion", "Home", "Beauty"] },
            { name: "discount_usage", label: "Uses Discounts", options: ["yes", "no"] },
            { name: "is_loyalty_member", label: "Loyalty Program Member", options: ["yes", "no"] },
            { name: "model_name", label: "Select Model", options: ["retail_random_forest", "retail_xgb", "retail_logistic"] }
          ].map(({ name, label, options }) => (
            <div key={name}>
              <label style={{ fontWeight: "bold" }}>{label}:</label>
              <select
                name={name}
                value={formData[name]}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  border: "1px solid #ccc",
                  borderRadius: "6px",
                  fontSize: "1rem"
                }}
              >
                <option value="">Select...</option>
                {options.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          ))}

          <button
            type="submit"
            style={{
              backgroundColor: "#2980b9",
              color: "#fff",
              padding: "1rem",
              border: "none",
              borderRadius: "6px",
              fontSize: "1.1rem",
              fontWeight: "bold",
              marginTop: "1rem",
              cursor: "pointer"
            }}
          >
            {loading ? "Predicting..." : "Predict Churn"}
          </button>

          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>

        {/* Result Section */}
        <div ref={resultRef} style={{
          padding: "2rem 1.5rem",
          backgroundColor: "#ffffff",
          display: "flex",
          flexDirection: "column"
        }}>
          {result ? (
            <>
              <h3 style={{ marginBottom: "1rem", color: "#2c3e50" }}>Prediction Results</h3>

              <div style={{ backgroundColor: "#eef2f5", padding: "1rem", borderRadius: "8px", marginBottom: "0.75rem" }}>
                <h4>Churn Probability</h4>
                <div style={{
                  fontSize: "2rem",
                  fontWeight: "bold",
                  color:
                    result.probability > 0.7 ? "#e74c3c" :
                      result.probability > 0.4 ? "#f39c12" : "#27ae60"
                }}>
                  {(result.probability * 100).toFixed(1)}%
                </div>
              </div>

              <div style={{ backgroundColor: "#eef2f5", padding: "1rem", borderRadius: "8px", marginBottom: "0.75rem" }}>
                <h4>Risk Level</h4>
                <div style={{
                  fontSize: "1.3rem",
                  fontWeight: "bold",
                  color:
                    result.risk_level === "High" ? "#e74c3c" :
                      result.risk_level === "Medium" ? "#f39c12" : "#27ae60"
                }}>
                  {result.risk_level}
                </div>
              </div>

              <div style={{ backgroundColor: "#eef2f5", padding: "1rem", borderRadius: "8px" }}>
                <h4>Recommendation</h4>
                <p style={{ fontSize: "0.95rem", color: "#555" }}>{result.recommendation}</p>
              </div>
            </>
          ) : (
            <div style={{ textAlign: "center", color: "#7f8c8d" }}>
              <h3>Submit the form to view prediction</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
