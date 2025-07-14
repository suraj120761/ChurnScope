import React, { useState, useRef } from "react";
import axios from "axios";

export default function ChurnPredictorBanking() {
  const [formData, setFormData] = useState({
    credit_score: "",
    age: "",
    tenure: "",
    balance: "",
    numOfProducts: "",
    hasCrCard: "",
    isActiveMember: "",
    estimatedSalary: "",
    geography: "",
    gender: "",
    model_name: "nate_xgb_model",
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
      credit_score: parseInt(formData.credit_score),
      age: parseInt(formData.age),
      tenure: parseInt(formData.tenure),
      balance: parseFloat(formData.balance),
      num_of_products: parseInt(formData.numOfProducts),
      has_cr_card: formData.hasCrCard === "yes" ? 1 : 0,
      is_active_member: formData.isActiveMember === "yes" ? 1 : 0,
      estimated_salary: parseFloat(formData.estimatedSalary),
      geography: formData.geography,
      gender: formData.gender,
      model_name: formData.model_name,
    };

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/predict/", payload);
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
    <div style={{ minHeight: "100vh", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", backgroundColor: "#ecf0f1" }}>
      {/* Navbar */}
      <nav style={{ backgroundColor: "#3b00dd", padding: "1rem 2rem", boxShadow: "0 2px 5px rgba(0,0,0,0.1)" }}>
        <div style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <h1 style={{ color: "white", fontSize: "1.5rem", margin: 0 }}>Banking Churn Prediction</h1>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            {["Home", "Banking", "Telecom"].map((item, idx) => (
              <a
                key={idx}
                href={`/${item.toLowerCase()}`}
                style={{ color: "white", textDecoration: "none", fontSize: "1rem" }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Layout */}
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
        <form
          onSubmit={handleSubmit}
          style={{
            padding: "2rem",
            backgroundColor: "#fafafa",
            display: "flex",
            flexDirection: "column",
            gap: "1rem"
          }}
        >
          <h3 style={{ marginBottom: "1rem", color: "#2c3e50" }}>Customer Information</h3>

          {[
            { name: "credit_score", label: "Credit Score", type: "number" },
            { name: "age", label: "Age", type: "number" },
            { name: "tenure", label: "Tenure", type: "number" },
            { name: "balance", label: "Account Balance", type: "number" },
            { name: "numOfProducts", label: "Number of Products", type: "number" },
            { name: "estimatedSalary", label: "Estimated Salary", type: "number" },
          ].map(({ name, label, type }) => (
            <div key={name}>
              <label style={{ fontWeight: "bold", marginBottom: "0.25rem", display: "block" }}>{label}:</label>
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

          {[
            { name: "hasCrCard", label: "Has Credit Card", options: ["yes", "no"] },
            { name: "isActiveMember", label: "Is Active Member", options: ["yes", "no"] },
            { name: "geography", label: "Geography", options: ["France", "Germany", "Spain"] },
            { name: "gender", label: "Gender", options: ["Male", "Female"] },
            {
              name: "model_name",
              label: "Select Model",
              options: ["nate_xgb_model", "random_forest", "nate_logistic_regression", "nate_decision_tree"]
            }
          ].map(({ name, label, options }) => (
            <div key={name}>
              <label style={{ fontWeight: "bold", marginBottom: "0.25rem", display: "block" }}>{label}:</label>
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
              cursor: "pointer",
              transition: "background-color 0.3s"
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#1c5985"}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#2980b9"}
          >
            {loading ? "Predicting..." : "Predict Churn"}
          </button>

          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>

        {/* Result Section */}
        <div
          ref={resultRef}
          style={{
            padding: "2rem 1.5rem",
            backgroundColor: "#ffffff",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {result ? (
            <>
              <h3 style={{ marginBottom: "1rem", color: "#2c3e50" }}>Prediction Results</h3>

              {/* Churn Probability */}
              <div style={{
                backgroundColor: "#f0f4f7",
                padding: "1rem",
                borderRadius: "8px",
                marginBottom: "0.75rem"
              }}>
                <h4 style={{ color: "#34495e", marginBottom: "0.5rem" }}>Churn Probability</h4>
                <div style={{
                  fontSize: "2rem",
                  fontWeight: "bold",
                  color:
                    result.probability > 70 ? "#e74c3c" :
                      result.probability > 40 ? "#f39c12" : "#27ae60"
                }}>
                  {result.probability}%
                </div>
              </div>

              {/* Risk Level */}
              <div style={{
                backgroundColor: "#f0f4f7",
                padding: "1rem",
                borderRadius: "8px",
                marginBottom: "0.75rem"
              }}>
                <h4 style={{ color: "#34495e", marginBottom: "0.5rem" }}>Risk Level</h4>
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

              {/* Recommendation */}
              <div style={{
                backgroundColor: "#f0f4f7",
                padding: "1rem",
                borderRadius: "8px"
              }}>
                <h4 style={{ color: "#34495e", marginBottom: "0.5rem" }}>Recommendation</h4>
                <p style={{ fontSize: "0.95rem", lineHeight: "1.4", color: "#555" }}>
                  {result.recommendation}
                </p>
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
