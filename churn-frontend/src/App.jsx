import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Home";
import Footer from "./Footer";
import ChurnPredictorBanking from "./ChurnPredictorBanking";
import ChurnPredictorTelecom from "./ChurnPredictorTelecom";
import ChurnPredictorRetail from "./ChurnPredictorRetail";

function App() {
  return (
    <div className="app-wrapper">
      <Router>
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/banking" element={<ChurnPredictorBanking />} />
            <Route path="/telecom" element={<ChurnPredictorTelecom />} />
            <Route path="/retail" element={<ChurnPredictorRetail />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
