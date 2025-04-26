// src/pages/Family.jsx
import React, { useEffect, useState } from "react";

const Family = () => {
  const [appointments, setAppointments] = useState([]);
  const [routines, setRoutines] = useState([]);

  useEffect(() => {
    // Fetch appointments
    fetch("http://localhost:5000/api/appointments")
      .then((res) => res.json())
      .then((data) => setAppointments(data))
      .catch((err) => console.error("Error fetching appointments:", err));

    // Fetch routines
    fetch("http://localhost:5000/api/routines")
      .then((res) => res.json())
      .then((data) => setRoutines(data))
      .catch((err) => console.error("Error fetching routines:", err));
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-pink-700">
        Family Dashboard
      </h1>

      {/* Appointments Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-green-600 mb-2">Appointments</h2>
        <ul className="space-y-2">
          {appointments.length === 0 ? (
            <li className="text-gray-500">No appointments available.</li>
          ) : (
            appointments.map((appt, index) => (
              <li
                key={index}
                className="bg-green-100 p-3 rounded shadow-sm flex justify-between"
              >
                <span>{appt.title}</span>
                <span className="text-sm text-gray-600">{appt.date}</span>
              </li>
            ))
          )}
        </ul>
      </section>

      {/* Routine Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-purple-600 mb-2">Daily Routine</h2>
        <ul className="space-y-2">
          {routines.length === 0 ? (
            <li className="text-gray-500">No routine set yet.</li>
          ) : (
            routines.map((routine, index) => (
              <li
                key={index}
                className="bg-purple-100 p-3 rounded shadow-sm flex justify-between"
              >
                <span>{routine.task}</span>
                <span className="text-sm text-gray-600">{routine.time}</span>
              </li>
            ))
          )}
        </ul>
      </section>
    </div>
  );
};

export default Family;
