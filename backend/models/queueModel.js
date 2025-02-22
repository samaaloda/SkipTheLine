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
    popele_count: {
      type: String,
      required: true
    },
    position: {
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