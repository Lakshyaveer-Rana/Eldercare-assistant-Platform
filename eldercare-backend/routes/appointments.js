// routes/appointments.js
const express = require("express");
const router = express.Router();

let appointments = [];
let idCounter = 1;

// Get all appointments
router.get("/", (req, res) => {
  res.json(appointments);
});

// Add a new appointment
router.post("/", (req, res) => {
  const { title, date } = req.body;

  if (!title || !date) {
    return res.status(400).json({ error: "Title and date are required" });
  }

  const newAppointment = {
    id: idCounter++,
    title,
    date,
  };

  appointments.push(newAppointment);
  res.status(201).json(newAppointment);
});

module.exports = router;
