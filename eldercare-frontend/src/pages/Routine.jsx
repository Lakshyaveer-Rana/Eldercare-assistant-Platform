// src/pages/Routine.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const Routine = () => {
  const [routines, setRoutines] = useState([]);
  const [newTask, setNewTask] = useState({ time: "", task: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 1. Fetch with Polling
  useEffect(() => {
    const fetchRoutines = () => {
      axios
        .get("http://localhost:5000/api/routines")
        .then((res) => {
          setRoutines(res.data);
        })
        .catch((err) => console.error("Error fetching routines:", err));
    };

    fetchRoutines();
    const interval = setInterval(fetchRoutines, 3000);
    return () => clearInterval(interval);
  }, []);

  // 2. Handle Input
  const handleInputChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  // 3. Add Task
  const addTask = (e) => {
    e.preventDefault();
    if (newTask.time && newTask.task) {
      setIsSubmitting(true);
      axios
        .post("http://localhost:5000/api/routines", newTask)
        .then((res) => {
          setRoutines([...routines, res.data]);
          setNewTask({ time: "", task: "" });
        })
        .catch((err) => console.error("Error adding routine:", err))
        .finally(() => setIsSubmitting(false));
    }
  };

  // 4. NEW: Delete Task Function
  const deleteTask = (id) => {
    // Optimistic UI update: Remove it from screen immediately
    const originalRoutines = [...routines];
    setRoutines(routines.filter((item) => (item._id || item.id) !== id));

    axios
      .delete(`http://localhost:5000/api/routines/${id}`)
      .then(() => {
        console.log("Deleted successfully");
      })
      .catch((err) => {
        console.error("Error deleting routine:", err);
        // Revert if it failed
        setRoutines(originalRoutines);
        alert("Could not delete. Check your backend connection.");
      });
  };

  return (
    <div className="min-h-screen bg-transparent p-6 md:p-12 font-sans text-slate-800">
      
      {/* Header */}
      <div className="max-w-5xl mx-auto mb-10 text-center md:text-left">
        <h1 className="text-4xl font-bold text-blue-900 mb-2">Daily Routine</h1>
        <p className="text-slate-500 text-lg">Manage daily habits and recurring activities.</p>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        
        {/* LEFT: Add Task Form */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-blue-100 h-fit">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-green-100 p-3 rounded-full text-green-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-800">Add New Habit</h2>
          </div>

          <form onSubmit={addTask} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-500 mb-2 uppercase tracking-wide">Activity Name</label>
              <input
                type="text"
                name="task"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                placeholder="e.g. Morning Walk"
                value={newTask.task}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-500 mb-2 uppercase tracking-wide">Time</label>
              <input
                type="time"
                name="time"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                value={newTask.time}
                onChange={handleInputChange}
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 rounded-xl font-bold text-white shadow-md transition-all ${
                isSubmitting ? "bg-green-400" : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {isSubmitting ? "Adding..." : "Add to Routine"}
            </button>
          </form>
        </div>

        {/* RIGHT: Timeline List */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-700 flex items-center gap-2">
              <span className="w-2 h-6 bg-green-500 rounded-full"></span>
              Your Daily Flow
            </h2>
            <span className="text-sm font-medium text-green-600 bg-green-100 px-3 py-1 rounded-full">
              {routines.length} Tasks
            </span>
          </div>

          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
            {routines.length === 0 ? (
              <div className="p-10 text-center border-dashed border-2 border-slate-200 rounded-2xl text-slate-400">
                <p>No routines set yet.</p>
              </div>
            ) : (
              routines.map((item, index) => (
                <div
                  key={index}
                  className="group bg-white p-5 rounded-2xl shadow-sm border-l-4 border-green-400 hover:shadow-md transition-all flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    {/* Time Badge */}
                    <div className="bg-green-50 px-3 py-2 rounded-lg text-green-700 font-bold border border-green-100 text-sm whitespace-nowrap">
                      {item.time}
                    </div>
                    
                    {/* Task Name */}
                    <div>
                      <h3 className="font-bold text-slate-800 text-lg">{item.task}</h3>
                    </div>
                  </div>
                  
                  {/* DELETE BUTTON */}
                  <button 
                    onClick={() => deleteTask(item._id || item.id)}
                    className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                    title="Delete Routine"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Routine;