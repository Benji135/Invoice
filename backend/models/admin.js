// models/admin.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Store hashed passwords in production!
  email: { type: String, required: true, unique: true },
});

const Admin = mongoose.model("admin", userSchema);

module.exports = Admin;
