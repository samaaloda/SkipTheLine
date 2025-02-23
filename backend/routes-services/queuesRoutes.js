const express = require('express');
const QueueModel = require('../models/queueModel.js'); // Assuming the QueueModel is in the models folder
const router = express.Router();

// Route to get all queue data
router.get('../../frontend/tabs/rides.js', async (req, res) => {
  try {
    const queues = await QueueModel.find(); // Fetch all queue records
    res.json(queues);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

module.exports = router;
