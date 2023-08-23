const express = require("express");
const router = express.Router();
const Admission = require("../schema/admissionSchema");
const User = require("../schema/user"); // Import the user schema

const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decodedToken) => {
    if (err) {
      return res
        .status(403)
        .json({ error: "Authentication failed. Token invalid." });
    }

    req.user = decodedToken;
    next();
  });
};

// API route to save Admission form data
router.post("/", verifyToken, async (req, res) => {
  console.log("Admission form submission received");
  const userId = req.params.userId;

  try {
    // const admissionData = req.params;
    // const userId = admissionData.userId; // Extract userId from admission data

    console.log("Attempting to fetch user by ID:", userId);
    const patient = await User.findById(userId);

    if (!patient) {
      console.log("Patient not found for ID:", userId);
      return res.status(404).json({ error: "Patient not found." });
    }

    console.log("Patient found:", patient);

    // Save the Admission data to the database
    const newAdmission = new Admission({
      // ...admissionData,
      ...req.body,
      userId,
    });
    await newAdmission.save();

    res.status(201).json({
      success: true,
      message: "Admission details saved successfully!",
    });
  } catch (error) {
    console.error("An error occurred during admission form submission:", error);
    res.status(500).json({
      error:
        "An error occurred during admission form submission. Please try again later.",
    });
  }
});

module.exports = router;
