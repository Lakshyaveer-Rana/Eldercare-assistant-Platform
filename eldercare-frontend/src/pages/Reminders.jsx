// src/pages/Reminders.jsx
import React, { useState, useEffect } from "react";

const Reminders = () => {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [reminders, setReminders] = useState([]);

  // Fetch existing reminders from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/reminders")
      .then((res) => res.json())
      .then((data) => setReminders(data))
      .catch((err) => console.error("Error fetching reminders:", err));
  }, []);

  // Submit new reminder to backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newReminder = { message: title, time };

    try {
      const res = await fetch("http://localhost:5000/api/reminders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newReminder),
      });

      if (!res.ok) {
        throw new Error("Failed to save reminder");
      }

      const savedReminder = await res.json();
      setReminders([...reminders, savedReminder]);
      setTitle("");
      setTime("");
    } catch (err) {
      console.error("Error saving reminder:", err);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 mt-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">Add a Reminder</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-semibold">Title</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Take medicine"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold">Time</label>
          <input
            type="time"
            className="w-full p-2 border border-gray-300 rounded"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          Save Reminder
        </button>
      </form>

      <h3 className="text-xl font-semibold mt-6 text-gray-700">Your Reminders</h3>
      <ul className="mt-2 space-y-2">
        {reminders.length === 0 && <li className="text-gray-500">No reminders yet.</li>}
        {reminders.map((reminder, index) => (
          <li
            key={index}
            className="bg-blue-100 p-3 rounded shadow-sm flex justify-between items-center"
          >
            <div>
              <p className="font-medium text-blue-700">{reminder.message}</p>
              <p className="text-sm text-gray-600">{reminder.time}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reminders;
