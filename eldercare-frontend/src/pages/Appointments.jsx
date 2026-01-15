// src/pages/Appointments.jsx
import React, { useState, useEffect } from "react";

const Appointments = () => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 1. Fetch Appointments from Backend (Real-time polling)
  // This ensures we see what is actually in the database
  useEffect(() => {
    const fetchAppointments = () => {
      fetch("http://localhost:5000/api/appointments")
        .then((res) => res.json())
        .then((data) => setAppointments(data))
        .catch((err) => console.error("Error fetching appointments:", err));
    };

    fetchAppointments();
    const interval = setInterval(fetchAppointments, 3000); // Update every 3 seconds
    return () => clearInterval(interval);
  }, []);

  // 2. Submit to Backend
  // This is the FIX: We send data to the server, not just local state
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newAppointment = { title, date };

    try {
      const res = await fetch("http://localhost:5000/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAppointment),
      });

      if (!res.ok) {
        throw new Error("Failed to save appointment");
      }

      // If successful, the polling (useEffect) will catch the new data automatically,
      // but we can also update locally for instant feedback.
      const savedAppointment = await res.json();
      setAppointments([...appointments, savedAppointment]);
      
      // Clear form
      setTitle("");
      setDate("");
    } catch (err) {
      console.error("Error saving appointment:", err);
      alert("Failed to save appointment. Is the backend running?");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-transparent p-6 md:p-12 font-sans text-slate-800">
      
      {/* Header */}
      <div className="max-w-5xl mx-auto mb-10 text-center md:text-left">
        <h1 className="text-4xl font-bold text-blue-900 mb-2">Medical Calendar</h1>
        <p className="text-slate-500 text-lg">Schedule doctor visits and therapy sessions.</p>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        
        {/* LEFT: Schedule Form */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-blue-100 h-fit">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-100 p-3 rounded-full text-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-800">New Appointment</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title Input */}
            <div>
              <label className="block text-sm font-semibold text-slate-500 mb-2 uppercase tracking-wide">Appointment For</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </span>
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Dr. Smith - Cardiologist"
                  required
                />
              </div>
            </div>

            {/* Date Input */}
            <div>
              <label className="block text-sm font-semibold text-slate-500 mb-2 uppercase tracking-wide">Date</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
                <input
                  type="date"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
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
              {isSubmitting ? "Scheduling..." : "Schedule Appointment"}
            </button>
          </form>
        </div>

        {/* RIGHT: Upcoming List */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-700 flex items-center gap-2">
              <span className="w-2 h-6 bg-blue-500 rounded-full"></span>
              Upcoming Visits
            </h2>
            <span className="text-sm font-medium text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
              {appointments.length} Scheduled
            </span>
          </div>

          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
            {appointments.length === 0 ? (
              // Empty State
              <div className="flex flex-col items-center justify-center p-10 bg-white rounded-2xl border border-dashed border-slate-300 text-slate-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p>No appointments scheduled.</p>
              </div>
            ) : (
              // Appointment Cards
              appointments.map((appt, index) => (
                <div
                  key={index}
                  className="group bg-white p-5 rounded-2xl shadow-sm border-l-4 border-blue-500 hover:shadow-md transition-all flex items-center justify-between"
                >
                  <div>
                    <h4 className="font-bold text-slate-800 text-lg">{appt.title}</h4>
                    <p className="text-slate-500 text-sm flex items-center gap-2 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {appt.date}
                    </p>
                  </div>
                  
                  <div className="bg-blue-50 p-2 rounded-full text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
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

export default Appointments;