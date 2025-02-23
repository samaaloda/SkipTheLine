const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const baseOptions = {
  timestamps: true
};

const QueueSchema = new Schema(
  {
    ride: {
      type: String,
      required: true
    },
    user: {
        type: String,
        required: true
    },
    people_count: {
      type: Number,
      required: true
    },
    position: {
        type: Number,
        required: true
    },
    groupPosition: {
      type: Number,
      required: true
    },
    upNext: {
        type: Boolean,
        required: true,
    }, 
    queued_at: {
        type: Date,
    }

  },
  baseOptions
);

QueueSchema.set('toObject', {
  virtuals: true,
  versionKey: false,
  transform: (_doc, ret) => {
    delete ret._id;
    delete ret.createdAt;
    delete ret.updatedAt;
  }
});

const QueueModel = model('Queue', QueueSchema);

module.exports = QueueModel;