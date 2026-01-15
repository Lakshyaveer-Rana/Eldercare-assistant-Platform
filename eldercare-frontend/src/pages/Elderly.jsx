// src/pages/Elderly.jsx
import React, { useEffect, useState } from "react";

const Elderly = () => {
  const [appointments, setAppointments] = useState([]);
  const [routines, setRoutines] = useState([]);
  const [reminders, setReminders] = useState([]); // New State for Reminders
  const [loading, setLoading] = useState(true);

  // 1. Get Today's Date
  const today = new Date();
  const dateOptions = { weekday: 'long', day: 'numeric', month: 'long' };
  const formattedDate = today.toLocaleDateString('en-US', dateOptions);

  // 2. Determine Greeting
  const hour = today.getHours();
  let greeting = "Good Morning";
  if (hour >= 12) greeting = "Good Afternoon";
  if (hour >= 17) greeting = "Good Evening";

  useEffect(() => {
    const fetchData = () => {
      // Fetch Appointments
      fetch("http://localhost:5000/api/appointments")
        .then((res) => res.json())
        .then((data) => setAppointments(data))
        .catch((err) => console.error("Error fetching appointments:", err));

      // Fetch Routines
      fetch("http://localhost:5000/api/routines")
        .then((res) => res.json())
        .then((data) => setRoutines(data))
        .catch((err) => console.error("Error fetching routines:", err));

      // Fetch Reminders (NEW)
      fetch("http://localhost:5000/api/reminders")
        .then((res) => res.json())
        .then((data) => {
          setReminders(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching reminders:", err);
          setLoading(false);
        });
    };

    fetchData();
    const interval = setInterval(fetchData, 5000); // Auto-refresh every 5s
    return () => clearInterval(interval);
  }, []);

  // 3. Merge EVERYTHING into one list
  const combinedSchedule = [
    ...appointments.map(a => ({ ...a, type: 'appointment', timeStr: a.date, label: 'Doctor Visit' })),
    ...routines.map(r => ({ ...r, type: 'routine', timeStr: r.time, label: 'Daily Routine' })),
    ...reminders.map(r => ({ ...r, type: 'reminder', timeStr: r.time, label: 'Reminder' })) // Added Reminders
  ];

  // Optional: Sort by time (String comparison for HH:MM)
  combinedSchedule.sort((a, b) => (a.timeStr > b.timeStr ? 1 : -1));

  return (
    <div className="min-h-screen bg-transparent p-6 font-sans text-slate-800">
      
      <div className="max-w-3xl mx-auto">
        
        {/* Header Section */}
        <header className="mb-10 text-center md:text-left bg-white p-8 rounded-3xl shadow-sm border border-blue-100">
          <p className="text-blue-500 font-semibold uppercase tracking-wide text-sm mb-2">Today is {formattedDate}</p>
          <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-2">{greeting}!</h1>
          <p className="text-slate-500 text-lg">Here is your plan for today.</p>
        </header>

        {/* Combined Schedule List */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-700 px-2 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Today's Schedule
          </h2>

          {loading ? (
             <p className="text-center text-slate-400 py-10">Loading your schedule...</p>
          ) : combinedSchedule.length === 0 ? (
            <div className="bg-white rounded-2xl p-10 text-center shadow-sm border border-blue-100">
              <p className="text-slate-500">You have no tasks, reminders, or appointments right now.</p>
            </div>
          ) : (
            combinedSchedule.map((item, index) => {
              
              // Define styles based on type
              let borderClass = "border-green-400"; // Default Routine
              let pillClass = "bg-green-100 text-green-700";
              let icon = (
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                 </svg>
              );

              if (item.type === 'appointment') {
                borderClass = "border-blue-500";
                pillClass = "bg-blue-100 text-blue-700";
                icon = (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                );
              } else if (item.type === 'reminder') {
                borderClass = "border-red-400"; // Red for attention
                pillClass = "bg-red-50 text-red-600";
                icon = (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                );
              }

              return (
                <div 
                  key={index} 
                  className={`flex items-center p-6 bg-white rounded-2xl shadow-sm border-l-8 transition-transform hover:scale-[1.02] ${borderClass}`}
                >
                  {/* Time Pill */}
                  <div className="flex-shrink-0 mr-6">
                    <span className={`block text-center font-bold text-lg px-4 py-2 rounded-xl min-w-[100px] ${pillClass}`}>
                      {item.timeStr || "Today"}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-grow">
                    <h3 className="text-2xl font-bold text-slate-800 mb-1">
                      {item.title || item.task || item.description}
                    </h3>
                    <p className="text-slate-500 font-medium text-sm uppercase tracking-wide">
                      {item.label}
                    </p>
                  </div>

                  {/* Icon (Visual Only) */}
                  <div className="hidden md:block">
                    {icon}
                  </div>
                </div>
              );
            })
          )}
        </div>

      </div>
    </div>
  );
};

export default Elderly;