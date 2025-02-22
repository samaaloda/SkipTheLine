// maybe implement this for the QR code

const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const baseOptions = {
  timestamps: true
};

const TciketModel = new Schema(
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
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true,
    }, 
    quequed_people: {
        type: Number,
        required: true,
    }

  },
  baseOptions
);

UserSchema.set('toObject', {
  virtuals: true,
  versionKey: false,
  transform: (_doc, ret) => {
    delete ret._id;
    delete ret.createdAt;
    delete ret.updatedAt;
  }
});

const UserModel = model('User', UserSchema);

module.exports = UserModel;