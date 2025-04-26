// src/pages/Routine.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const Routine = () => {
  const [routines, setRoutines] = useState([]);
  const [newTask, setNewTask] = useState({ time: "", task: "" });

  // Fetch existing routines from the backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/routines")
      .then((res) => setRoutines(res.data))
      .catch((err) => console.error("Error fetching routines:", err));
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  // Add a new task to the routine
  const addTask = () => {
    if (newTask.time && newTask.task) {
      axios
        .post("http://localhost:5000/api/routines", newTask)
        .then((res) => {
          setRoutines([...routines, res.data]);
          setNewTask({ time: "", task: "" });
        })
        .catch((err) => console.error("Error adding routine:", err));
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-4">Daily Routine</h1>

      {/* Add New Task */}
      <div className="mb-6 bg-white rounded-xl shadow-md p-4 max-w-xl">
        <h2 className="text-xl font-semibold mb-2">Add New Task</h2>
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Time Input */}
          <div className="flex flex-col w-full">
            <label htmlFor="time" className="text-sm text-gray-700 mb-1">
              Time
            </label>
            <input
              id="time"
              type="time"
              name="time"
              value={newTask.time}
              onChange={handleInputChange}
              className="border p-2 rounded w-full"
              required
            />
          </div>

          {/* Task Input */}
          <div className="flex flex-col w-full">
            <label htmlFor="task" className="text-sm text-gray-700 mb-1">
              Task
            </label>
            <input
              id="task"
              type="text"
              name="task"
              placeholder="Enter task"
              value={newTask.task}
              onChange={handleInputChange}
              className="border p-2 rounded w-full"
              required
            />
          </div>

          {/* Add Button */}
          <button
            onClick={addTask}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 self-end"
          >
            Add
          </button>
        </div>
      </div>

      {/* Show Routine List */}
      <div className="grid gap-4 max-w-3xl">
        {routines.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-gradient-to-r from-indigo-400 to-purple-500 text-white p-4 rounded-xl shadow-md"
          >
            <div>
              <h3 className="text-lg font-semibold">{item.task}</h3>
              <p className="text-sm">{item.time}</p>
            </div>
            <div className="text-xl">✅</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Routine;
