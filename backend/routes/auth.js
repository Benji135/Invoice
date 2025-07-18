import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/admin.js"; // Make sure the path and filename match, and it has ES export

const router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET;

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      console.log("User not found");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // NOTE: For production, use bcrypt to hash & compare passwords
    if (password !== user.password) {
      console.log("Invalid password attempt");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const payload = {
      userId: user._id,
      username: user.username,
      email: user.email,
    };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });

    res.json({ token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
