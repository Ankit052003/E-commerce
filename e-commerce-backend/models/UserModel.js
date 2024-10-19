const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    validate: {
      validator: function (v) {
        return /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email!`,
    },
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: 8,
  },
  userName: {
    type: String,
    required: [true, "Username is required"],
    minlength: 3,
    trim: true, // Ensure no extra spaces are saved
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
    validate: {
      validator: function (v) {
        return /^[0-9]{10}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
  profilePhoto: {
    type: String,
    default: "default-profile-photo.jpg",
  },
}, {
  timestamps: true, // Automatically creates createdAt and updatedAt fields
});

// Hash password before saving the user
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Method to compare entered password with hashed password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Use singular model name for consistency
module.exports = mongoose.model("User", userSchema);
