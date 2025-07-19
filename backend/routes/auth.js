const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/admin");
const router = express.Router();
require("dotenv").config();

const SECRET_KEY = process.env.JWT_SECRET;

router.post("/login", async (req, res) => {
  const ip = req.ip;
  const { username, password } = req.body;
  console.log(`Login attempt from IP: ${ip}, Username: ${username}`);

  try {
    const user = await User.findOne({ username });

    if (!user) {
      console.log("User not found");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // WARNING: Use bcrypt in production
    if (password !== user.password) {
      console.log("Invalid password attempt");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (!SECRET_KEY) {
      console.error("❌ JWT_SECRET is not defined");
      return res.status(500).json({ message: "JWT secret not configured" });
    }

    const payload = {
      userId: user._id,
      username: user.username,
      email: user.email,
    };

    // Generate new token
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });

    // ✅ Update token directly in DB without triggering full validation
    await User.updateOne({ _id: user._id }, { token });

    res.json({ token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
