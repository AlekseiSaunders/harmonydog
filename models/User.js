const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  address: {
    type: String,
  },
  phone: {
    type: String,
  },
  privileges: {
    type: String,
    default: 'user',
    enum: ['user', 'admin', 'root'],
  },

  // password: String,
  // passwordResetToken: String,
  // passwordResetExpires: Date,
  // emailVerificationToken: String,
  // emailVerified: Boolean,
  // tokens: Array,
});

// exporting the model from above. To be referenced elsewhere as 'User'
module.exports = mongoose.model('User', UserSchema);
