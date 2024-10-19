const express = require("express");
const inventoryModel = require("../models/InventoryModel");
const AsyncWrapper = require("../middlewares/ErrorWrapper");
const Auth = require("../middlewares/Auth");

const router = express.Router();

// Get all inventory items
router.get(
  "/",
  AsyncWrapper(async (req, res) => {
    console.log('Signed in user id:', req.userId);
    const products = await inventoryModel.find();
    return res.status(200).send({
      message: "Inventory List",
      data: products,
    });
  })
);

// Search for inventory items by keyword
router.get(
  "/search/:keyword",
  Auth,
  AsyncWrapper(async (req, res) => {
    const keyword = req.params.keyword;
    if (!keyword) {
      return res.status(200).send({
        data: [],
      });
    }
    const resp = await inventoryModel.find({
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    });
    return res.status(200).send({
      data: resp,
    });
  })
);

// Create new inventory items
router.post(
  "/create-inventory",
  Auth,
  AsyncWrapper(async (req, res) => {
    const data = req.body.data; // Expecting `data` as an array of inventory items
    const resp = await inventoryModel.insertMany(data);
    console.log("Inserted Inventory Response:", resp);
    return res.status(201).send({
      message: "Data Inserted Successfully",
      status: true,
      data: resp,
    });
  })
);

module.exports = router;
