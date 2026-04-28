require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

// Import Routes
const authRoutes = require("./routes/authRoutes");
const opportunityRoutes = require("./routes/opportunityRoutes");
const applicationRoutes = require("./routes/applicationRoutes");

const app = express();


// =============================
// Connect MongoDB
// =============================
connectDB();


// =============================
// Middlewares
// =============================
app.use(cors());
app.use(express.json()); // Parse JSON requests


// =============================
// API Routes
// =============================

// Authentication
app.use("/api/auth", authRoutes);

// Opportunities (Admin + Volunteer)
app.use("/api/opportunities", opportunityRoutes);

// Applications (Volunteer Apply + Admin Manage)
app.use("/api/applications", applicationRoutes);


// =============================
// Test Route
// =============================
app.get("/", (req, res) => {
  res.send("WasteZero API Running...");
});


// =============================
// Start Server
// =============================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});