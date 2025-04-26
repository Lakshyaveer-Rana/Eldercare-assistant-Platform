const express = require("express");
const router = express.Router();

const users = []; // Fake in-memory database

router.post("/signup", (req, res) => {
  const { name, email, password, role } = req.body;

  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  users.push({ name, email, password, role });
  res.status(201).json({ message: "Signup successful!" });
});

module.exports = router;
