const express = require("express");
const Customer = require("../models/customer"); // No .js needed with require

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

module.exports = router;
