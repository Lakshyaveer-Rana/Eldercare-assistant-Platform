// src/pages/Home.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  // We mapped your existing routes to the new "Clean Card" design with SVGs
  const features = [
    {
      title: "Elderly View",
      description: "Simplified interface and tools for elderly users.",
      route: "/elderly",
      iconColor: "text-blue-600",
      bgColor: "bg-blue-50",
      // User Icon
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    },
    {
      title: "Family Dashboard",
      description: "Monitor care, view stats, and manage routines.",
      route: "/family",
      iconColor: "text-indigo-600",
      bgColor: "bg-indigo-50",
      // Family/Group Icon
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 005.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    },
    {
      title: "Reminders",
      description: "Never miss medicine or important tasks.",
      route: "/reminders",
      iconColor: "text-purple-600",
      bgColor: "bg-purple-50",
      // Bell Icon
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    },
    {
      title: "Appointments",
      description: "Manage doctor visits and medical schedules.",
      route: "/appointments",
      iconColor: "text-teal-600",
      bgColor: "bg-teal-50",
      // Calendar Icon
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    },
    {
      title: "Daily Routine",
      description: "Track daily activities and wellness habits.",
      route: "/routine",
      iconColor: "text-green-600",
      bgColor: "bg-green-50",
      // Heart/Health Icon
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    },
    {
      title: "Hospital Data",
      description: "Quick access to emergency contacts and logs.",
      route: "/hospital-data",
      iconColor: "text-red-600",
      bgColor: "bg-red-50",
      // Alert/Hospital Icon
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    },
  ];

  return (
    <div className="min-h-screen bg-transparent font-sans text-slate-800">
      
      {/* Hero Section */}
      <div className="pt-16 pb-12 text-center px-4">
        {/* Decorative Heart Icon above title */}
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-white rounded-full shadow-sm">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
             </svg>
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-4 tracking-tight">
          Caring for Elders, <span className="text-blue-600">Digitally</span>
        </h1>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-8">
          A comprehensive care assistance system designed to support elderly individuals, their families, and healthcare providers.
        </p>
        
        <button 
          onClick={() => navigate('/family')}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1"
        >
          Get Started &rarr;
        </button>
      </div>

      {/* Cards Grid */}
      <div className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {features.map((feature, index) => (
            <div 
              key={index}
              onClick={() => navigate(feature.route)}
              className="bg-white rounded-2xl p-8 shadow-sm border border-blue-100 cursor-pointer hover:shadow-md transition-all duration-300 hover:-translate-y-1 group"
            >
              {/* Icon Container */}
              <div className={`w-14 h-14 ${feature.bgColor} ${feature.iconColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {feature.icon}
                </svg>
              </div>

              <h3 className="text-xl font-bold text-slate-800 mb-2">{feature.title}</h3>
              <p className="text-slate-500 mb-6 leading-relaxed">
                {feature.description}
              </p>

              <div className="flex items-center text-sm font-semibold text-blue-600 group-hover:text-blue-700">
                Learn more 
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </div>
          ))}

        </div>
      </div>

    </div>
  );
};

export default Home;