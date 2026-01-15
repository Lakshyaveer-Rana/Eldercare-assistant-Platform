// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import Pages
import Home from "./pages/Home";
import Elderly from "./pages/Elderly";
import Family from "./pages/Family";
import Reminders from "./pages/Reminders";
import Appointments from "./pages/Appointments";
import Routine from "./pages/Routine";

// Import Components
import Sidebar from "./components/Sidebar";
import CursorTrail from "./components/CursorTrail"; // <--- IMPORT THE NEW TRAIL

// Import CSS
import "./App.css";

function App() {
  return (
    <Router>
      <div className="flex bg-transparent min-h-screen relative">
        
        {/* 1. Add the Cursor Trail here (It overlays everything) */}
        <CursorTrail />
        
        {/* The Sidebar (Fixed Left) */}
        <Sidebar />

        {/* Main Content Area (Pushed Right) */}
        <div className="flex-1 md:ml-64 transition-all">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/elderly" element={<Elderly />} />
            <Route path="/family" element={<Family />} />
            <Route path="/reminders" element={<Reminders />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/routine" element={<Routine />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;