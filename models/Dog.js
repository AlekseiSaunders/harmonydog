const mongoose = require('mongoose');

const DogSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    default: 'female',
    enum: ['female', 'male'],
    required: true,
  },
  breed: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
  },
  image: {
    type: String,
    require: true,
  },
  cloudinaryId: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  notes: {
    type: String,
  },
  owner: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
	],
  medications: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Medication',
    },
  ],
  behaviors: [
    {
      type: mongoose.Schema.Types.ObjectID,
      ref: 'Behavior',
    },
  ],
});

// exporting the model from above. To be referenced elsewhere as 'User'
module.exports = mongoose.model('Dog', DogSchema);
