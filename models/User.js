const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const { use } = require('passport');

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  password: {
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
  addressStreet: {
    type: String,
  },
  addressCity: {
    type: String,
  },
  addressZip: {
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
});

// Password hashing middleware

UserSchema.pre('save', function save(next) {
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

// Helper method for validating user's password
UserSchema.methods.comparePassword = function comparePassword(
  candidatePassword,
  cb
) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};

// exporting the model from above. To be referenced elsewhere as 'User'
module.exports = mongoose.model('User', UserSchema);
