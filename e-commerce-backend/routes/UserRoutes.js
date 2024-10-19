const express = require("express");
const AsyncWrapper = require("../middlewares/ErrorWrapper");
const userModel = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const router = express.Router();

router.get("/", (req, res) => {
  return res.send("API is running");
});

// User Sign-Up
router.post(
  "/sign-up",
  AsyncWrapper(async (req, res) => {
    const existingUser = await userModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).send({
        status: false,
        message: "User already exists.",
      });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new userModel({ ...req.body, password: hashedPassword });
    await newUser.save();

    return res.status(201).send({
      status: true,
      message: "Signup successful",
    });
  })
);

// User Sign-In
router.post(
  "/sign-in",
  AsyncWrapper(async (req, res) => {
    const existingUser = await userModel.findOne({
      email: req.body.email,
    });
    
    if (!existingUser) {
      return res.status(400).send({
        status: false,
        message: "User doesn't exist.",
      });
    }

    console.log("User found:", existingUser);
    
    // Log password comparison
    const isValidPwd = bcrypt.compareSync(req.body.password, existingUser.password);
    console.log("Is password valid?", isValidPwd);

    if (!isValidPwd) {
      return res.status(400).send({
        status: false,
        message: "Wrong Password",
      });
    } else {
      const access_token = jwt.sign(
        {
          id: existingUser._id,
        },
        "Hello_World"
      );

      existingUser.password = ""; // Don't return the password

      return res.send({
        status: true,
        message: "Signin successful",
        access_token,
        user: existingUser,
      });
    }
  })
);


module.exports = router;