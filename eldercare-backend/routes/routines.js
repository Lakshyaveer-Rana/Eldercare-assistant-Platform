// routes/routines.js
const express = require("express");
const router = express.Router();

let routines = []; // You can replace this with DB later

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
  const newRoutine = { time, task };
  routines.push(newRoutine);
  res.status(201).json(newRoutine);
});

module.exports = router;