import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Store hashed passwords in production!
  email: { type: String, required: true, unique: true },
});

const Admin = mongoose.model("admin", userSchema);

export default Admin;
