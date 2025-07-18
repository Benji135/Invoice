// models/customer.js
const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    ntn: {
      type: String,
      required: true,
      match: [/^\d{6}-\d{1}$/, "Invalid NTN format (e.g. 123456-7)"],
    },
    strn: {
      type: String,
      required: true,
      match: [/^\d{2}-\d{2}-\d{4}-\d{3}-\d{2}$/, "Invalid STRN format (e.g. 03-04-5205-001-19)"],
    },
    phone: { type: String, required: true },
    hqAddress: { type: String, required: true },
    factoryAddress: { type: String, required: true },
    email: {
      type: String,
      required: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
    },
    web: {
      type: String,
      required: true,
      match: [/^(https?:\/\/)?[\w\-]+(\.[\w\-]+)+[/#?]?.*$/, "Invalid URL"],
    },
    companyType: {
      type: String,
      required: true,
      enum: [
        "Private Limited",
        "Sole Proprietorship",
        "Partnership",
        "Public Limited",
        "Government Organization",
      ],
    },
    registered: {
      type: String,
      required: true,
      enum: ["Yes", "No"],
    },
    cnic: {
      type: String,
      required: true,
      match: [/^\d{5}-\d{7}-\d{1}$/, "Invalid CNIC format (e.g. 35201-5484777-3)"],
    },
    iso: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Customer = mongoose.model("Customer", customerSchema);
module.exports = Customer;
