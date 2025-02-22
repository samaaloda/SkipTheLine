const express = require("express");
const router = express.Router();
const RideModel = require("../models/rideModel");

router.post("/rides", async (req, res) => {
    try {
      const { name, avg_time, capacity, location } = req.body;
  
      // Check if the ride already exists
      const existingRide = await RideModel.findOne({ name });
      if (existingRide) {
        return res.status(400).json({ message: "Ride already exists." });
      }
  
      // Create new ride with queuedPeople set to 0
      const newRide = new RideModel({
        name,
        avg_time,
        capacity,
        location,
        quequedPeople: 0, // Ensure queuedPeople starts at 0
      });
  
      await newRide.save();
      return res.status(201).json({ message: "Ride created successfully.", ride: newRide });
    } catch (error) {
      console.error("Error creating ride:", error);
      return res.status(500).json({ message: "Internal server error." });
    }
  });
  
module.exports = router;