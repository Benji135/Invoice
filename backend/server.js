const dotenv = require("dotenv");
dotenv.config(); // Load environment variables

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/auth");
const registerCustomerRoutes = require("./routes/customerRoute");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use("/api", authRoutes);
app.use("/api", registerCustomerRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
