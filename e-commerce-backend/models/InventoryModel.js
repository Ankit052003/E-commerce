const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
    minlength: 3,
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
    min: 0,
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    trim: true,
    minlength: 10,
  },
  category: {
    type: String,
    required: [true, "Category is required"],
    trim: true,
  },
  quantity: {
    type: Number,
    required: [true, "Quantity is required"],
    default: 10,
    min: 0,
  },
  image: {
    type: String,
    default: "default-product-image.jpg",
  },
  rating: {
    rate: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    count: {
      type: Number,
      default: 0,
    },
  },
}, {
  timestamps: true, // Automatically create createdAt and updatedAt fields
});

// Use singular model name for consistency
module.exports = mongoose.model("Inventory", inventorySchema);
