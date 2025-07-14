import React from "react";
import { Link } from "react-router-dom";
import { Banknote, PhoneCall } from "lucide-react";
import Navbar from "./Navbar";

export default function HomePage() {
  return (
    <>
      <Navbar />

      <div
        style={{
          minHeight: "100vh",
          fontFamily: "Arial, sans-serif",
          padding: "2rem",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* Main Header */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h2 style={{ fontSize: "2.5rem", color: "#2c3e50", marginBottom: "1rem" }}>
            Customer Churn Prediction
          </h2>
          <p
            style={{
              fontSize: "1.2rem",
              color: "#7f8c8d",
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            Predict customer churn using advanced machine learning models for banking, telecom and retail industries
          </p>
        </div>

        {/* Card Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
            gap: "2rem",
          }}
        >
          {/* Banking Card */}
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "12px",
              padding: "2rem",
              border: "1px solid #e1e8ed",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
            }}
          >
            <div
              style={{
                width: "60px",
                height: "60px",
                backgroundColor: "#3498db",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1.5rem",
              }}
            >
              <Banknote color="white" size={32} />
            </div>
            <h3 style={{ fontSize: "1.5rem", color: "#2c3e50", marginBottom: "1rem" }}>
              Banking Churn Prediction
            </h3>
            <p style={{ color: "#7f8c8d", marginBottom: "2rem", lineHeight: "1.6" }}>
              Predict customer churn in banking sector based on account activity, transaction patterns, and customer demographics.
            </p>
            <Link
              to="/banking"
              style={{
                display: "inline-block",
                backgroundColor: "#3498db",
                color: "white",
                padding: "0.75rem 1.5rem",
                borderRadius: "6px",
                textDecoration: "none",
                fontWeight: "bold",
                transition: "background-color 0.3s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#2980b9")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#3498db")}
            >
              Start Prediction →
            </Link>
          </div>

          {/* Telecom Card */}
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "12px",
              padding: "2rem",
              border: "1px solid #e1e8ed",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
            }}
          >
            <div
              style={{
                width: "60px",
                height: "60px",
                backgroundColor: "#e74c3c",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1.5rem",
              }}
            >
              <PhoneCall color="white" size={32} />
            </div>
            <h3 style={{ fontSize: "1.5rem", color: "#2c3e50", marginBottom: "1rem" }}>
              Telecom Churn Prediction
            </h3>
            <p style={{ color: "#7f8c8d", marginBottom: "2rem", lineHeight: "1.6" }}>
              Analyze telecom customer behavior, usage patterns, and service satisfaction to predict churn probability.
            </p>
            <Link
              to="/telecom"
              style={{
                display: "inline-block",
                backgroundColor: "#e74c3c",
                color: "white",
                padding: "0.75rem 1.5rem",
                borderRadius: "6px",
                textDecoration: "none",
                fontWeight: "bold",
                transition: "background-color 0.3s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#c0392b")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#e74c3c")}
            >
              Start Prediction →
            </Link>
          </div>
          {/* Banking Card */}
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "12px",
              padding: "2rem",
              border: "1px solid #e1e8ed",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
            }}
          >
            <div
              style={{
                width: "60px",
                height: "60px",
                backgroundColor: "#3498db",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1.5rem",
              }}
            >
              <Banknote color="white" size={32} />
            </div>
            <h3 style={{ fontSize: "1.5rem", color: "#2c3e50", marginBottom: "1rem" }}>
              Retail Churn Prediction
            </h3>
            <p style={{ color: "#7f8c8d", marginBottom: "2rem", lineHeight: "1.6" }}>
              Predict customer churn in the retail sector based on shopping behavior, transaction frequency, recency of last purchase, product category engagement, and customer demographics.
            </p>
            <Link
              to="/retail"
              style={{
                display: "inline-block",
                backgroundColor: "#3498db",
                color: "white",
                padding: "0.75rem 1.5rem",
                borderRadius: "6px",
                textDecoration: "none",
                fontWeight: "bold",
                transition: "background-color 0.3s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#2980b9")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#3498db")}
            >
              Start Prediction →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
