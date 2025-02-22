const express = require('express');
const bcrypt = require('bcryptjs');
const UserModel = require('../models/userModel');  // Adjust path as necessary
const router = express.Router();

// Signup Route
router.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    // Check if user already exists
    const existingUser = await UserModel.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new UserModel({
      username,
      password: hashedPassword
    });

    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Login Route (Authentication)
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }


  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get User Route (For authenticated users)
router.get('/me', async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    const user = await UserModel.findById(req.session.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.put('/update-user/:id', async (req, res) => {
  const { id } = req.params;
  const { currentlyQueued, readyRides } = req.body;

  try {
    // Validate that only allowed fields are passed
    const updateData = {};
    if (currentlyQueued !== undefined) {
      updateData.currentlyQueued = currentlyQueued;
    }
    if (readyRides !== undefined) {
      updateData.readyRides = readyRides;
    }

    // Check if at least one field is being updated
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ message: 'No valid fields to update.' });
    }

    // Find the user by ID and update
    const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });

    // If the user does not exist
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Send the updated user as response
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
