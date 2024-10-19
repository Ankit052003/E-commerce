const express = require("express");
const AsyncWrapper = require("../middlewares/ErrorWrapper");
const AddressModel = require("../models/AddressModel"); // Removed duplicate import
const UserModel = require("../models/UserModel");

const router = express.Router();

// Get user addresses
router.get(
  "/get-user-address",
  AsyncWrapper(async (req, res) => {
    const addresses = await AddressModel.find({ user: req.userId });
    return res.send({
      status: true,
      data: addresses,
    });
  })
);

// Create a new user address
router.post(
  "/create-user-address",
  AsyncWrapper(async (req, res) => {
    const address = new AddressModel({
      ...req.body,
      user: req.userId,
    });
    await address.save();
    return res.send({
      status: true,
      message: "Address created successfully",
    });
  })
);

module.exports = router;
