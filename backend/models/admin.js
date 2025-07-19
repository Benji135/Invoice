// models/admin.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  token: { type: String }, // ✅ Add this to store the active token
});

const Admin = mongoose.model("admin", userSchema);
module.exports = Admin;
