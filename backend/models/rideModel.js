const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const baseOptions = {
  timestamps: true
};

const RideSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    avg_time: {
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true,
    }, 
    quequedPeople: {
        type: Number,
        required: true,
    }, 
    quequedGroups: {
      type: Number,
      required: true,
    }

  },
  baseOptions
);

RideSchema.set('toObject', {
  virtuals: true,
  versionKey: false,
  transform: (_doc, ret) => {
    delete ret._id;
    delete ret.createdAt;
    delete ret.updatedAt;
  }
});

const RideModel = model('Ride', RideSchema);

module.exports = RideModel;