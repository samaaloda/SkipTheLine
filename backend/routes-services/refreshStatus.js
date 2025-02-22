const mongoose = require('mongoose');
const QueueModel = require('./models/Queue');  
const RideModel = require('./models/Ride');    
const UserModel = require('./models/User');    
const moment = require('moment'); 


async function updateQueueAndRides() {
  try {
    const currentTime = moment();
    
    // step 1
    const expiredQueues = await QueueModel.find({
      queued_at: { $lt: currentTime.subtract(5, 'minutes').toDate() }
    });

    if (expiredQueues.length > 0) {
      for (let queueItem of expiredQueues) {
        const ride = await RideModel.findOne({ name: queueItem.ride });

        if (ride) {
          ride.quequedPeople -= 1;
          await ride.save();
        }

        await QueueModel.findByIdAndDelete(queueItem._id);
      }
    }

    // step 2
    const allQueues = await QueueModel.find().sort({ position: 1 });

    const groupedQueues = allQueues.reduce((acc, queueItem) => {
      if (!acc[queueItem.ride]) acc[queueItem.ride] = [];
      acc[queueItem.ride].push(queueItem);
      return acc;
    }, {});

    for (const rideName in groupedQueues) {
      const rideQueues = groupedQueues[rideName];
      
      for (let i = 0; i < rideQueues.length; i++) {
        rideQueues[i].position = i + 1;  
        await rideQueues[i].save();
      }
    }

    // Step 3: Set `upNext` to `true` for the top 20 queue items
    const top20Queues = await QueueModel.find().sort({ position: 1 }).limit(20);

    for (let queueItem of top20Queues) {
      if (!queueItem.upNext) {
        queueItem.upNext = true;
        queueItem.queued_at = currentTime.toDate(); 
        await queueItem.save();

        const user = await UserModel.findOne({ username: queueItem.user });

        if (user && !user.readyRides.includes(queueItem.ride)) {
            user.readyRides.push(queueItem.ride);
            await user.save();
        }
      }
      
    }


    const rides = await RideModel.find(); // Get all rides

    for (const ride of rides) {
        const capacity = ride.capacity; // Get the ride's capacity

        // Get top N (capacity) queues for this ride
        const topQueues = await QueueModel.find({ ride: ride.name })
            .sort({ position: 1 })
            .limit(capacity);

        for (let queueItem of topQueues) {
            if (!queueItem.upNext) {
                queueItem.upNext = true;
                queueItem.queued_at = new Date(); // Set queue time
                await queueItem.save();

                // Find the user and update their ready rides
                const user = await UserModel.findOne({ username: queueItem.user });
                if (user && !user.readyRides.includes(queueItem.ride)) {
                    user.readyRides.push(queueItem.ride);
                    await user.save();
                }
            }
        }
    }

    console.log('Queue update and ride preparation completed successfully.');
  } catch (error) {
    console.error('Error during the queue and ride update process:', error);
  }
}
