import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="simple-footer">
      <p>© {new Date().getFullYear()} ChurnPredict. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
