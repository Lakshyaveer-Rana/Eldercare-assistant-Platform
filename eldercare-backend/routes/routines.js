// routes/routines.js
const express = require("express");
const router = express.Router();

let routines = []; // Local storage

// GET all routines
router.get("/", (req, res) => {
  res.json(routines);
});

// POST a new routine
router.post("/", (req, res) => {
  const { time, task } = req.body;
  
  if (!time || !task) {
    return res.status(400).json({ message: "Time and Task are required" });
  }

  // 1. WE ADD A UNIQUE ID HERE (Date.now() creates a unique number based on time)
  const newRoutine = { 
    id: Date.now().toString(), 
    time, 
    task 
  };

  routines.push(newRoutine);
  res.status(201).json(newRoutine);
});

// DELETE a routine by ID (NEW CODE)
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  // Filter the array to keep only items that DO NOT match this ID
  routines = routines.filter((routine) => routine.id !== id);

  res.json({ message: "Routine deleted successfully" });
});

module.exports = router;