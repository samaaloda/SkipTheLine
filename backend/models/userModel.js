const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const baseOptions = {
  timestamps: true
};

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true
    },
    password: {
        type: String,
        required: true
    },
    currentlyQueued: {
        type: Number,
    }, 
    readyRides: {
        type: [String],
    },

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