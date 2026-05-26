const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();


// CONNECT DATABASE
connectDB();


// MIDDLEWARE
app.use(cors());
app.use(express.json());


// ROUTES
app.use("/api/auth", authRoutes);

app.use("/api/projects", projectRoutes);

app.use("/api/tasks", taskRoutes);

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("API Running");
});


// PORT
const PORT = process.env.PORT || 5000;


// START SERVER
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});