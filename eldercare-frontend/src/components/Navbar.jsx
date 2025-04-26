import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-700 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">Elder Care System</h1>
        <div className="flex space-x-6">
          <Link to="/" className="text-white hover:text-blue-200 transition duration-300">
            Home
          </Link>
          <Link to="/elderly" className="text-white hover:text-blue-200 transition duration-300">
            Elderly
          </Link>
          <Link to="/family" className="text-white hover:text-blue-200 transition duration-300">
            Family
          </Link>
          <Link to="/reminders" className="text-white hover:text-blue-200 transition duration-300">
            Reminders
          </Link>
          <Link to="/appointments" className="text-white hover:text-blue-200 transition duration-300">
            Appointments
          </Link>
          <Link to="/routine" className="text-white hover:text-blue-200 transition duration-300">
            Routine
          </Link>
          <Link to="/hospital-data" className="text-white hover:text-blue-200 transition duration-300">
            Hospital Data
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
