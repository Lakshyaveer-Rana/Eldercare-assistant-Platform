// src/pages/Reminders.jsx
import React, { useState, useEffect } from "react";

const Reminders = () => {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [reminders, setReminders] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 1. Fetch Logic with Polling (Real-time updates)
  useEffect(() => {
    const fetchReminders = () => {
      fetch("http://localhost:5000/api/reminders")
        .then((res) => res.json())
        .then((data) => {
          // Optional: Sort reminders by time if you want
          // data.sort((a, b) => a.time.localeCompare(b.time));
          setReminders(data);
        })
        .catch((err) => console.error("Error fetching reminders:", err));
    };

    fetchReminders();
    const interval = setInterval(fetchReminders, 3000); // Poll every 3 seconds
    return () => clearInterval(interval);
  }, []);

  // 2. Submit Logic (Preserved exactly as you had it, just added loading state)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

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
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-transparent p-6 md:p-12 font-sans text-slate-800">
      
      {/* Page Header */}
      <div className="max-w-5xl mx-auto mb-10 text-center md:text-left">
        <h1 className="text-4xl font-bold text-blue-900 mb-2">Reminders Center</h1>
        <p className="text-slate-500 text-lg">Set alerts for medication, appointments, and daily tasks.</p>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        
        {/* LEFT COLUMN: The "Add" Form */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-blue-100 h-fit">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-100 p-3 rounded-full text-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-800">New Reminder</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title Input */}
            <div>
              <label className="block text-sm font-semibold text-slate-500 mb-2 uppercase tracking-wide">Reminder Title</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </span>
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Take Heart Medicine"
                  required
                />
              </div>
            </div>

            {/* Time Input */}
            <div>
              <label className="block text-sm font-semibold text-slate-500 mb-2 uppercase tracking-wide">Set Time</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
                <input
                  type="time"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 rounded-xl font-bold text-white shadow-md transition-all transform hover:scale-[1.02] ${
                isSubmitting ? "bg-blue-400 cursor-wait" : "bg-blue-600 hover:bg-blue-700 hover:shadow-lg"
              }`}
            >
              {isSubmitting ? "Saving..." : "Save Reminder"}
            </button>
          </form>
        </div>

        {/* RIGHT COLUMN: The List */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-700 flex items-center gap-2">
              <span className="w-2 h-6 bg-blue-500 rounded-full"></span>
              Upcoming List
            </h2>
            <span className="text-sm font-medium text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
              {reminders.length} Active
            </span>
          </div>

          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
            {reminders.length === 0 ? (
              // Empty State
              <div className="flex flex-col items-center justify-center p-10 bg-white rounded-2xl border border-dashed border-slate-300 text-slate-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <p>No reminders yet. Add one!</p>
              </div>
            ) : (
              // Reminder Cards
              reminders.map((reminder, index) => (
                <div
                  key={index}
                  className="group bg-white p-5 rounded-2xl shadow-sm border border-slate-100 hover:border-blue-300 transition-all flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    {/* Bell Icon Circle */}
                    <div className="h-12 w-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-lg leading-tight">{reminder.message}</h4>
                      <p className="text-xs text-slate-400 font-semibold mt-1 uppercase tracking-wide">Daily Alert</p>
                    </div>
                  </div>
                  
                  {/* Time Display */}
                  <div className="text-right pl-4">
                     <span className="block text-xl font-bold text-blue-600">{reminder.time}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Reminders;