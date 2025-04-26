const express = require("express");
const router = express.Router();

let medications = []; // Simple memory-based list

// POST /api/medications/add
router.post("/add", (req, res) => {
  const { name, time } = req.body;

  if (!name || !time) {
    return res.status(400).json({ message: "Name and time are required." });
  }

  medications.push({ name, time });
  res.status(201).json({ message: "Medication added successfully!" });
});

// GET /api/medications/list
router.get("/list", (req, res) => {
  res.json(medications);
});

module.exports = router;
