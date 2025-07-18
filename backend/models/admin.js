const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Store hashed passwords in production!
  email: { type: String, required: true, unique: true },
});

module.exports = mongoose.model('admin', userSchema);