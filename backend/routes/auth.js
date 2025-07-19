const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/admin"); // CommonJS require
const router = express.Router();

// Load env variables (in case not loaded globally)
require("dotenv").config();

const SECRET_KEY = process.env.JWT_SECRET;

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      console.log("User not found");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // WARNING: Replace this with bcrypt in production
    if (password !== user.password) {
      console.log("Invalid password attempt");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const payload = {
      userId: user._id,
      username: user.username,
      email: user.email,
    };

    if (!SECRET_KEY) {
      console.error("❌ JWT_SECRET is not defined in environment variables.");
      return res.status(500).json({ message: "JWT secret not configured" });
    }

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });

    res.json({ token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
