import React from "react";
import { Github } from "lucide-react"; // Optional icon
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="modern-footer">
      <div className="footer-container">
        <p className="footer-brand">ChurnPredict</p>

        <div className="footer-links">
          
          <a
            href="https://github.com/suraj120761/ChurnScope"
            target="_blank"
            rel="noreferrer"
            className="github-link"
          >
            <Github size={16} style={{ marginRight: "6px" }} />
            GitHub
          </a>
        </div>

        <p className="footer-copy">
          © {new Date().getFullYear()} All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
