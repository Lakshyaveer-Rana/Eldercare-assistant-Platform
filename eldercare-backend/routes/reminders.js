// routes/reminders.js
const express = require("express");
const router = express.Router();

let reminders = [];

// Get all reminders
router.get("/", (req, res) => {
  res.json(reminders);
});

// Create a new reminder
router.post("/", (req, res) => {
  const { time, message } = req.body;
  if (!time || !message) {
    return res.status(400).json({ message: "Time and message are required" });
  }

  const newReminder = { time, message };
  reminders.push(newReminder);
  res.status(201).json(newReminder);
});

// Update an existing reminder
router.put("/:index", (req, res) => {
  const { index } = req.params;
  const { time, message } = req.body;

  if (index >= reminders.length || index < 0) {
    return res.status(404).json({ message: "Reminder not found" });
  }

  if (!time || !message) {
    return res.status(400).json({ message: "Time and message are required" });
  }

  reminders[index] = { time, message };
  res.status(200).json(reminders[index]);
});

// Delete a reminder
router.delete("/:index", (req, res) => {
  const { index } = req.params;
  if (index >= reminders.length || index < 0) {
    return res.status(404).json({ message: "Reminder not found" });
  }

  reminders.splice(index, 1);
  res.status(204).send();
});

module.exports = router;
