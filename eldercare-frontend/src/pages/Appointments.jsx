// src/pages/Appointments.jsx
import React, { useState, useEffect } from "react";

const Appointments = () => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [appointments, setAppointments] = useState([]);

  // Load sample data initially for demo
  useEffect(() => {
    const sampleAppointments = [
      { id: 1, title: "Doctor Visit", date: "2025-04-20" },
      { id: 2, title: "Therapy Session", date: "2025-04-21" },
      { id: 3, title: "Family Video Call", date: "2025-04-22" },
    ];
    setAppointments(sampleAppointments);
  }, []);

  // Optional: Handle real submission later when backend is fixed
  const handleSubmit = (e) => {
    e.preventDefault();

    const newAppointment = {
      id: appointments.length + 1,
      title,
      date,
    };

    setAppointments([...appointments, newAppointment]);
    setTitle("");
    setDate("");
  };

  return (
    <div className="max-w-xl mx-auto p-4 mt-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-blue-600 mb-4 text-center">
        Appointment Scheduler
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium text-gray-700">Title</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700">Date</label>
          <input
            type="date"
            className="w-full p-2 border rounded"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Save Appointment
        </button>
      </form>

      <h3 className="mt-6 font-semibold text-gray-800">Your Appointments</h3>
      <ul className="mt-2 space-y-2">
        {appointments.length === 0 && (
          <li className="text-gray-500">No appointments yet.</li>
        )}
        {appointments.map((appt) => (
          <li
            key={appt.id}
            className="bg-blue-100 p-3 rounded shadow-sm flex justify-between"
          >
            <span className="font-medium">{appt.title}</span>
            <span className="text-sm text-gray-600">{appt.date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Appointments;
