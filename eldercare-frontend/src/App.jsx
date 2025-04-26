// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Elderly from "./pages/Elderly";
import Family from "./pages/Family";
import Reminders from "./pages/Reminders"; // 👈 Import yahan hona chahiye
import Appointments from './pages/Appointments';
import Routine from "./pages/Routine";
import HospitalData from "./pages/HospitalData";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-blue-100">
        <Navbar />
        <Routes>
        <Route path="/appointments" element={<Appointments />} />
          <Route path="/" element={<Home />} />
          <Route path="/elderly" element={<Elderly />} />
          <Route path="/family" element={<Family />} />
          <Route path="/reminders" element={<Reminders />} /> {/* ✅ Correctly placed */}
          <Route path="/routine" element={<Routine />} />
          <Route path="/hospital-data" element={<HospitalData />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
