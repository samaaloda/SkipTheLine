const express = require("express");
const router = express.Router();
const QueueModel = require("../models/queueModel");
const RideModel = require("../models/rideModel");
const UserModel = require("../models/userModel");

// Add user to the queue
router.post("/queue", async (req, res) => {
  try {
    const { username, ride, people_count } = req.body;

    // Validate people_count
    if (people_count > 5) {
      return res.status(400).json({ error: "People count cannot exceed 5." });
    }

    // Find the ride
    const rideDetails = await RideModel.findOne({ name: ride });
    if (!rideDetails) {
      return res.status(404).json({ error: "Ride not found." });
    }

    // Find the user
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    if (user.currentlyQueued >= 8) {
      return res.status(400).json({ error: "User has queued the max number of rides" });
    }

    // Check if the user is already queued for this ride
    if (user.readyRides.includes(ride)) {
      return res.status(400).json({ error: "You are already in the queue for this ride." });
    }

    // Get the current number of queued people
    let queueCount = rideDetails.quequedPeople;
    const capacity = parseInt(rideDetails.capacity); // Convert capacity to number

    // Determine queue position
    const position = queueCount + people_count;
    const groupPosition = rideDetails.quequedGroups + 1
    let upNext = position <= capacity; // Up next if within capacity

    // Create queue entry
    const queueEntry = new QueueModel({
      ride,
      user: username,
      popele_count: people_count,
      position,
      upNext,
      queued_at: upNext ? new Date() : null,
    });

    // Save queue entry
    await queueEntry.save();

    // Update ride's queuedPeople count
    rideDetails.quequedPeople += people_count;
    rideDetails.quequedGroups += 1
    await rideDetails.save();

    // If upNext is true, add the ride to user's readyRides
    if (upNext) {
      user.readyRides.push(ride);
      await user.save();
    }

    return res.status(201).json({ message: "Successfully queued.", queueEntry });
  } catch (error) {
    console.error("Queue error:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
});

// Remove user from the queue
router.delete("/queue", async (req, res) => {
    try {
      const { username, ride } = req.body;
  
      // Find the user's queue entry for the ride
      const queueEntry = await QueueModel.findOne({ user: username, ride });
      if (!queueEntry) {
        return res.status(404).json({ error: "Queue entry not found." });
      }
  
      // Find the ride
      const rideDetails = await RideModel.findOne({ name: ride });
      if (!rideDetails) {
        return res.status(404).json({ error: "Ride not found." });
      }
  
      // Find the user
      const user = await UserModel.findOne({ username });
      if (!user) {
        return res.status(404).json({ error: "User not found." });
      }
  
      // Remove queue entry
      await QueueModel.deleteOne({ _id: queueEntry._id });
  
      // Decrease queuedPeople count in RideModel
      rideDetails.quequedPeople = Math.max(0, rideDetails.quequedPeople - 1);
      await rideDetails.save();
  
      // Remove ride from user's readyRides if it was marked upNext
      if (queueEntry.upNext) {
        user.readyRides = user.readyRides.filter(r => r !== ride);
        await user.save();
      }
  
      // Reorder positions for the remaining queue items
      await QueueModel.updateMany(
        { ride, position: { $gt: queueEntry.position } },
        { $inc: { position: -1 } }
      );
  
      return res.status(200).json({ message: "Removed from queue successfully." });
    } catch (error) {
      console.error("Queue deletion error:", error);
      return res.status(500).json({ error: "Internal server error." });
    }
  });
  
module.exports = router;
