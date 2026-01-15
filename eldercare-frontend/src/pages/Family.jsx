// src/pages/Family.jsx
import React, { useEffect, useState } from "react";

const Family = () => {
  const [appointments, setAppointments] = useState([]);
  const [routines, setRoutines] = useState([]);

  useEffect(() => {
    // Define the fetch logic in a function so we can reuse it
    const fetchData = () => {
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
    };

    // 1. Call it immediately when page loads
    fetchData();

    // 2. Set up a timer to call it again every 3 seconds (Real-time feel)
    const interval = setInterval(fetchData, 3000);

    // 3. Cleanup: Stop the timer if the user leaves this page
    return () => clearInterval(interval);
  }, []);

  // --- UI HELPER CONSTANTS ---
  // We calculate these based on the data we fetched to make the dashboard "live"
  const nextAppointmentCount = appointments.length;
  const routineCount = routines.length;

  return (
    <div className="min-h-screen bg-transparent p-6 md:p-10 font-sans text-slate-800">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-blue-900">Family Dashboard</h1>
          <p className="text-slate-500 mt-1">Monitor your loved one's care and activities</p>
        </header>

        {/* Top Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          
          {/* Card 1: Upcoming Appointments */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-100 flex justify-between items-center">
            <div>
              <p className="text-sm text-slate-500 font-medium mb-1">Upcoming Appointments</p>
              <h2 className="text-3xl font-bold text-blue-900">{nextAppointmentCount}</h2>
            </div>
            <div className="p-3 bg-blue-50 rounded-full text-blue-600">
              {/* Calendar Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>

          {/* Card 2: Daily Routine Progress */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-100 flex justify-between items-center">
            <div className="w-full mr-4">
              <p className="text-sm text-slate-500 font-medium mb-1">Total Routines Set</p>
              <div className="flex items-end gap-2">
                <h2 className="text-3xl font-bold text-blue-900">{routineCount}</h2>
                <span className="text-sm text-green-600 mb-1 font-medium">Active</span>
              </div>
              {/* Decorative Progress Bar */}
              <div className="w-full bg-slate-100 rounded-full h-2 mt-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: routineCount > 0 ? '100%' : '0%' }}></div>
              </div>
            </div>
            <div className="p-3 bg-green-50 rounded-full text-green-600">
              {/* Check Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>

          {/* Card 3: Tasks Completed (Placeholder for future logic) */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-100 flex justify-between items-center">
            <div>
              <p className="text-sm text-slate-500 font-medium mb-1">Tasks Completed</p>
              <h2 className="text-3xl font-bold text-blue-900">0/{routineCount}</h2>
            </div>
            <div className="p-3 bg-indigo-50 rounded-full text-indigo-600">
              {/* Clock Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Bottom Detailed Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Appointments Overview */}
          <section className="bg-white p-6 rounded-xl shadow-sm border border-blue-100 h-full">
            <h2 className="text-xl font-bold text-blue-900 mb-6 flex items-center gap-2">
              <span className="text-blue-500">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              </span>
              Appointments Overview
            </h2>

            <div className="space-y-3">
              {appointments.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 text-slate-400">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-2 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                   <p>No upcoming appointments</p>
                </div>
              ) : (
                appointments.map((appt, index) => (
                  <div key={index} className="flex items-center p-4 bg-slate-50 rounded-lg border-l-4 border-blue-500 hover:shadow-md transition-shadow">
                    <div className="flex-1">
                      <h4 className="font-semibold text-slate-800">{appt.title}</h4>
                      <p className="text-sm text-slate-500">{appt.date}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>

          {/* Daily Routine Status */}
          <section className="bg-white p-6 rounded-xl shadow-sm border border-blue-100 h-full">
             <h2 className="text-xl font-bold text-blue-900 mb-6 flex items-center gap-2">
              <span className="text-green-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </span>
              Daily Routine Status
            </h2>

            <div className="space-y-3">
              {routines.length === 0 ? (
                 <div className="flex flex-col items-center justify-center py-10 text-slate-400">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-2 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                   <p>No routines set up</p>
                </div>
              ) : (
                routines.map((routine, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-100 hover:border-green-300 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      <span className="font-medium text-slate-700">{routine.task}</span>
                    </div>
                    <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                      {routine.time}
                    </span>
                  </div>
                ))
              )}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default Family;