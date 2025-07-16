import React from "react";
import { Link } from "react-router-dom";
import { Banknote, PhoneCall, ShoppingBag } from "lucide-react";
import Navbar from "./Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <div
        style={{
          minHeight: "100vh",
          fontFamily: "Segoe UI, sans-serif",
          padding: "3rem 2rem",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* Main Header */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h2 style={{ fontSize: "2.75rem", color: "#2c3e50", marginBottom: "1rem", fontWeight: 700 }}>
            Customer Churn Prediction
          </h2>
          <p
            style={{
              fontSize: "1.2rem",
              color: "#6c757d",
              maxWidth: "600px",
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            Predict customer churn with accuracy using ML models tailored for Banking, Telecom, and Retail sectors.
          </p>
        </div>

        {/* Card Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
            gap: "2rem",
          }}
        >
          <ChurnCard
            title="Banking Churn Prediction"
            description="Analyze customer transactions, usage trends, and demographics to identify banking churn risks."
            link="/banking"
            icon={<Banknote color="white" size={28} />}
            bgColor="#6610f2"
            hoverColor="#1565c0"
          />
          <ChurnCard
            title="Telecom Churn Prediction"
            description="Predict churn in the telecom sector using service usage data, contract details, and support interactions."
            link="/telecom"
            icon={<PhoneCall color="white" size={28} />}
            bgColor="#0d6efd"
            hoverColor="#b71c1c"
          />
          <ChurnCard
            title="Retail Churn Prediction"
            description="Assess customer loyalty in retail through order frequency, satisfaction scores, and engagement behavior."
            link="/retail"
            icon={<ShoppingBag color="white" size={28} />}
            bgColor="#6610f2"
            hoverColor="#00695c"
          />
        </div>
      </div>
    </>
  );
}

function ChurnCard({ title, description, link, icon, bgColor, hoverColor }) {
  return (
    <div
      style={{
        backgroundColor: "#fff",
        borderRadius: "12px",
        padding: "2rem",
        border: "1px solid #e0e0e0",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
        transition: "all 0.3s ease",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-6px)";
        e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.12)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.05)";
      }}
    >
      <div>
        <div
          style={{
            width: "56px",
            height: "56px",
            backgroundColor: bgColor,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "1.5rem",
            transition: "background-color 0.3s ease",
          }}
        >
          {icon}
        </div>

        <h3 style={{ fontSize: "1.4rem", color: "#2c3e50", marginBottom: "0.75rem", fontWeight: 600 }}>
          {title}
        </h3>

        <p style={{ color: "#555", lineHeight: 1.6, fontSize: "0.95rem", marginBottom: "1.75rem" }}>
          {description}
        </p>
      </div>

      <Link
        to={link}
        style={{
          alignSelf: "flex-start",
          backgroundColor: bgColor,
          color: "white",
          padding: "0.7rem 1.4rem",
          borderRadius: "6px",
          textDecoration: "none",
          fontWeight: "bold",
          transition: "background-color 0.3s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = hoverColor)}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = bgColor)}
      >
        Start Prediction →
      </Link>
    </div>
  );
}
