// src/pages/Home.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Elderly",
      description: "Support and tools for elderly users.",
      color: "from-purple-400 to-blue-500",
      route: "/elderly",
      icon: "🧓",
    },
    {
      title: "Family",
      description: "Family members can manage and monitor care.",
      color: "from-green-400 to-teal-500",
      route: "/family",
      icon: "👨‍👩‍👧",
    },
    {
      title: "Reminders",
      description: "Set medicine or appointment reminders.",
      color: "from-pink-400 to-red-500",
      route: "/reminders",
      icon: "💊",
    },
    {
      title: "Routine",
      description: "Manage daily tasks and activities.",
      color: "from-indigo-400 to-purple-600",
      route: "/routine",
      icon: "🕒",
    },
    {
      title: "Hospital Data",
      description: "View or update hospital-related info.",
      color: "from-yellow-400 to-orange-500",
      route: "/hospital-data",
      icon: "🏥",
    },
    {
      title: "Appointments",
      description: "Schedule and view doctor appointments.",
      color: "from-blue-400 to-cyan-500",
      route: "/appointments",
      icon: "📅",
    },
  ];

  return (
    <div className="p-6">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-blue-700 mb-2">
          Welcome to Elderly Care Assistant
        </h1>
        <p className="text-gray-600 text-lg">
          Helping elders stay safe and families stay informed.
        </p>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {cards.map((card, index) => (
          <div
            key={index}
            onClick={() => navigate(card.route)}
            className={`cursor-pointer rounded-2xl bg-gradient-to-br ${card.color} text-white p-6 shadow-lg hover:scale-105 transform transition duration-300 ease-in-out`}
          >
            <div className="text-4xl mb-2">{card.icon}</div>
            <h2 className="text-2xl font-semibold mb-1">{card.title}</h2>
            <p className="text-sm">{card.description}</p>
          </div>
        ))}
      </div>

      {/* Additional Visual Section */}
      <div className="mt-16 text-center max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-blue-700 mb-4">
          Empowering Elder Care
        </h2>
        <p className="text-gray-600 mb-6">
          Our platform includes features that help with medication tracking, appointments, emergency alerts, and caregiver coordination.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="text-3xl mb-2">📞</div>
            <h3 className="font-semibold text-lg">Emergency Contact</h3>
            <p className="text-sm text-gray-600">
              Quick-call emergency support for family or doctors.
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="text-3xl mb-2">🔔</div>
            <h3 className="font-semibold text-lg">Reminder Alarms</h3>
            <p className="text-sm text-gray-600">
              Alarms for taking medicine or going to appointments.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
