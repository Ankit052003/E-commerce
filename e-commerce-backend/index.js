const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const errorHandler = require("./middlewares/ErrorHandler");
const InventoryRoutes = require("./routes/InventoryRoutes");
const UserRoutes = require("./routes/UserRoutes");
const AddressRoutes = require("./routes/AddressRoutes");
const OrderRoutes = require("./routes/OrderRoutes");
const Auth = require("./middlewares/Auth");

// Initialize the app
const app = express();

// Initial Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("tiny")); // Logging middleware

// Connect to MongoDB (options useNewUrlParser, useUnifiedTopology are optional with mongoose 6.x+)
mongoose
  .connect("mongodb://localhost:27017/E-Commerce")
  .then(() => console.log("DB Connected"))
  .catch((error) => console.error("DB Connection Error:", error.message));

// Routes
app.use("/user", UserRoutes); // User routes without Auth (assuming sign-up/login logic here)
app.use("/inventory", InventoryRoutes); // Inventory-related routes
app.use("/address", Auth, AddressRoutes); // Address routes requiring authentication
app.use("/order", Auth, OrderRoutes); // Order routes requiring authentication

// Final Middleware for Error Handling
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 8002;
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});

module.exports = app;