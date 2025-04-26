// server.js
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const appointmentRoutes = require("./routes/appointments");
app.use("/api/appointments", appointmentRoutes);

const reminderRoutes = require("./routes/reminders");
app.use("/api/reminders", reminderRoutes);

const routineRoutes = require("./routes/routines");
app.use("/api/routines", routineRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
