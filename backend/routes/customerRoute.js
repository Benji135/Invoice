import express from "express";
import Customer from "../models/customer.js"; // Include .js for ES modules

const router = express.Router();

router.post("/register-customer", async (req, res) => {
  try {
    const customer = new Customer(req.body);
    await customer.save();
    res.status(201).json({ message: "Customer registered successfully" });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: "Failed to register customer" });
  }
});

export default router;
