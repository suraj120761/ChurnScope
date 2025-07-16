import React, { useState, useRef } from "react";
import axios from "axios";
import Navbar from "./Navbar"; // ✅ Adjust path if needed

export default function ChurnPredictorRetail() {
  const [formData, setFormData] = useState({
    tenure: "",
    preferred_login_device: "",
    city_tier: "",
    warehouse_to_home: "",
    preferred_payment_mode: "",
    gender: "",
    hour_spend_on_app: "",
    number_of_device_registered: "",
    prefered_order_cat: "",
    satisfaction_score: "",
    marital_status: "",
    number_of_address: "",
    complain: "",
    order_amount_hike_fromlast_year: "",
    coupon_used: "",
    order_count: "",
    day_since_last_order: "",
    cashback_amount: "",
    model_name: "random_forest",
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
      tenure: parseInt(formData.tenure),
      preferred_login_device: formData.preferred_login_device,
      city_tier: parseInt(formData.city_tier),
      warehouse_to_home: parseInt(formData.warehouse_to_home),
      preferred_payment_mode: formData.preferred_payment_mode,
      gender: formData.gender,
      hour_spend_on_app: parseFloat(formData.hour_spend_on_app),
      number_of_device_registered: parseInt(formData.number_of_device_registered),
      prefered_order_cat: formData.prefered_order_cat,
      satisfaction_score: parseInt(formData.satisfaction_score),
      marital_status: formData.marital_status,
      number_of_address: parseInt(formData.number_of_address),
      complain: parseInt(formData.complain),
      order_amount_hike_fromlast_year: parseFloat(formData.order_amount_hike_fromlast_year),
      coupon_used: parseInt(formData.coupon_used),
      order_count: parseInt(formData.order_count),
      day_since_last_order: parseInt(formData.day_since_last_order),
      cashback_amount: parseFloat(formData.cashback_amount),
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
      <Navbar />

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

          {/* Input Fields */}
          {[{ name: "tenure", label: "Tenure (months)" },
            { name: "city_tier", label: "City Tier" },
            { name: "warehouse_to_home", label: "Warehouse to Home (km)" },
            { name: "hour_spend_on_app", label: "Hours Spent on App per Day" },
            { name: "number_of_device_registered", label: "Number of Devices Registered" },
            { name: "satisfaction_score", label: "Satisfaction Score (1-5)" },
            { name: "number_of_address", label: "Number of Addresses" },
            { name: "complain", label: "Complaints (0/1)" },
            { name: "order_amount_hike_fromlast_year", label: "Order Amount Hike from Last Year (%)" },
            { name: "coupon_used", label: "Coupons Used" },
            { name: "order_count", label: "Total Orders" },
            { name: "day_since_last_order", label: "Days Since Last Order" },
            { name: "cashback_amount", label: "Cashback Amount (₹)" }
          ].map(({ name, label }) => (
            <div key={name}>
              <label style={{ fontWeight: "bold" }}>{label}:</label>
              <input
                type="number"
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

          {/* Dropdown Fields */}
          {[{ name: "preferred_login_device", label: "Preferred Login Device", options: ["Mobile Phone", "Phone", "Computer"] },
            { name: "preferred_payment_mode", label: "Preferred Payment Mode", options: ["UPI", "Cash on Delivery", "Debit Card", "Credit Card", "E wallet", "Net Banking"] },
            { name: "gender", label: "Gender", options: ["Male", "Female"] },
            { name: "prefered_order_cat", label: "Preferred Order Category", options: ["Laptop & Accessory", "Mobile", "Others", "Fashion", "Grocery"] },
            { name: "marital_status", label: "Marital Status", options: ["Single", "Married", "Divorced"] },
            { name: "model_name", label: "Select Model", options: ["adaboostclassifier", "decision_tree", "logistic_regression", "random_forest", "support_vector_machine", "xgbclassifier"] }
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
                  {result.probability}%
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
