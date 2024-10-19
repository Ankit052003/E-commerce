const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Use "User" to match the model name
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  streetName: {
    type: String,
    required: true,
  },
  houseNumber: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  pin: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["Home", "Office", "Outdoor"],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  deletedAt: {
    type: Date,
  },
});

// Use plural form for consistency
module.exports = mongoose.model("Address", addressSchema);
