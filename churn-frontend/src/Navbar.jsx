import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "./assets/image.png"; // ✅ Make sure the image is in /src/assets

export default function Navbar() {
  const location = useLocation();

  const getPageTitle = () => {
    if (location.pathname.includes("banking")) return "Banking Churn Prediction";
    if (location.pathname.includes("telecom")) return "Telecom Churn Prediction";
    if (location.pathname.includes("retail")) return "Retail Churn Prediction";
    return "Customer Churn Prediction";
  };

  return (
    <nav
      style={{
        backgroundColor: "#3b00dd",
        padding: "0.75rem 1.5rem",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        {/* Logo + Brand */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", flex: 1 }}>
          <img
            src={logo}
            alt="ChurnPredict Logo"
            style={{
              height: "80px", // Increased size
              width: "80px",
              objectFit: "contain",
              marginLeft: "-10px", // Moves logo slightly more left
              borderRadius: "8px",
            }}
          />
          <h1
            style={{
              color: "white",
              fontSize: "1.8rem",
              fontWeight: 700,
              margin: 0,
            }}
          >
            {getPageTitle()}
          </h1>
        </div>

        {/* Navigation Links */}
        <div
          style={{
            display: "flex",
            gap: "1.5rem",
            fontSize: "1rem",
            flexWrap: "wrap",
            justifyContent: "flex-end",
          }}
        >
          {[
            { name: "Home", path: "/" },
            { name: "Banking", path: "/banking" },
            { name: "Telecom", path: "/telecom" },
            { name: "Retail", path: "/retail" },
          ].map(({ name, path }, idx) => {
            const isActive = location.pathname === path;
            return (
              <Link
                key={idx}
                to={path}
                style={{
                  color: "white",
                  textDecoration: "none",
                  fontWeight: 500,
                  paddingBottom: "3px",
                  borderBottom: isActive ? "2px solid #ffffff" : "2px solid transparent",
                  transition: "border-bottom 0.3s ease, color 0.2s",
                  opacity: isActive ? 1 : 0.9,
                }}
              >
                {name}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
