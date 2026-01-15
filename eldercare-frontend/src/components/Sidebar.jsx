// src/components/Sidebar.jsx
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { 
      name: "Home", 
      path: "/", 
      color: "text-blue-600", 
      bgActive: "bg-blue-100",
      borderActive: "border-blue-500",
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
    },
    { 
      name: "Elderly View", 
      path: "/elderly", 
      color: "text-purple-600", 
      bgActive: "bg-purple-100", 
      borderActive: "border-purple-500",
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
    },
    { 
      name: "Family Dashboard", 
      path: "/family", 
      color: "text-indigo-600", 
      bgActive: "bg-indigo-100", 
      borderActive: "border-indigo-500",
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 005.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
    },
    { 
      name: "Reminders", 
      path: "/reminders", 
      color: "text-red-500", 
      bgActive: "bg-red-100", 
      borderActive: "border-red-500",
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
    },
    { 
      name: "Appointments", 
      path: "/appointments", 
      color: "text-teal-600", 
      bgActive: "bg-teal-100", 
      borderActive: "border-teal-500",
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
    },
    { 
      name: "Routine", 
      path: "/routine", 
      color: "text-green-600", 
      bgActive: "bg-green-100", 
      borderActive: "border-green-500",
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
    },
  ];

  return (
    // FIX: Replaced 'bg-white' with 'glass-sidebar' so animation shows through
    <div className="h-screen w-64 glass-sidebar fixed left-0 top-0 flex flex-col shadow-2xl z-50">
      
      {/* Brand */}
      <div className="p-8 border-b border-white/20 flex items-center gap-3">
        <div className="bg-gradient-to-tr from-blue-600 to-purple-600 p-2 rounded-lg text-white shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
        </div>
        <h1 className="text-xl font-bold text-slate-800 tracking-tight">Care<span className="text-purple-600">Connect</span></h1>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group border-l-4 ${
                isActive
                  ? `${item.bgActive} ${item.borderActive} shadow-md`
                  : "border-transparent hover:bg-white/40"
              }`}
            >
              {/* FIX: Icon color is now ALWAYS applied using {item.color} */}
              <span className={`transition-transform duration-300 ${item.color} ${isActive ? "scale-110" : "group-hover:scale-110"}`}>
                {item.icon}
              </span>
              
              <span className={`font-medium ${isActive ? "text-slate-900 font-bold" : "text-slate-600"}`}>
                {item.name}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/20">
        <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl p-4 text-white shadow-lg animate-pulse">
          <p className="text-xs font-semibold opacity-90 uppercase mb-1">System Status</p>
          <p className="font-bold text-sm">Emergency Alerts Active</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;