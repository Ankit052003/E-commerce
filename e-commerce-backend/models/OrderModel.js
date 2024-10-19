const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference should be capitalized to match the User model
    required: true,
  },
  products: [
    {
      itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Inventory", // Change ref to match the singular model name
        required: true,
      },
      quantity: {
        type: Number,
        required: true, // It's good practice to require quantity
        min: 1, // Ensures quantity is at least 1
      },
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
    min: 0, // Ensures total price cannot be negative
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["Pending", "Dispatched", "Shipped", "Out Of Delivery", "Delivered"],
    default: "Pending", // Optionally set default status
  },
  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Address", // Reference should be capitalized to match the Address model
    required: true,
  },
});

// Use singular model name for consistency
module.exports = mongoose.model("Order", orderSchema);
