const express = require("express");
const AsyncWrapper = require("../middlewares/ErrorWrapper");
const OrderModel = require("../models/OrderModel");

const router = express.Router();

// Get all orders for the signed-in user
router.get(
  "/get-user-orders",
  AsyncWrapper(async (req, res) => {
    const orders = await OrderModel.find({ user: req.userId })
      .populate("products.itemId", "title description")
      .populate("address");
      
    return res.status(200).send({
      status: true,
      data: orders,
    });
  })
);

// Get a specific order by its ID
router.get(
  "/get-user-orders-by-id/:id",
  AsyncWrapper(async (req, res) => {
    const order = await OrderModel.findById(req.params.id)
      .populate("products.itemId", "title description")
      .populate("address");
      
    if (!order) {
      return res.status(404).send({
        status: false,
        message: "Order not found",
      });
    }

    return res.status(200).send({
      status: true,
      data: order,
    });
  })
);

// Create a new order
router.post(
  "/create-new-order",
  AsyncWrapper(async (req, res) => {
    const newOrder = new OrderModel({
      ...req.body,
      user: req.userId,
    });

    await newOrder.save();

    return res.status(201).send({
      status: true,
      message: "Order placed successfully",
      data: newOrder, // Optionally return the created order data
    });
  })
);

module.exports = router;
