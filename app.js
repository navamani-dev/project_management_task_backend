require("dotenv").config();
const pool = require("./config/db");
const express = require("express");
const rateLimit = require("express-rate-limit");
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,                  // 10 requests
  message: {
    message: "Too many authentication attempts. Please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");
const taskRoutes = require("./routes/taskRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/auth",authLimiter, authRoutes);
app.use("/projects", projectRoutes);
app.use("/tasks", taskRoutes);
app.use("/dashboard", dashboardRoutes);

const PORT = process.env.PORT || 5000;
pool.query("SELECT NOW()", (err, result) => {
  if (err) {
    console.log("Database connection failed");
  } else {
    console.log("Database connected");
  }
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});