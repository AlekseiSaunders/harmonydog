const mongoose = require('mongoose');

const DogSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
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
    required: true,
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
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  behaviors: [
    {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Behavior',
      },
      proficiency: {
        type: String,
        default: 'naive',
        enum: ['naive', 'learning', 'practicing', 'proficient'],
      },
    },
  ],
  classes: [
    {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class',
      },
      status: {
        type: String,
        default: 'enrolled',
        enum: ['enrolled', 'begun', 'completed'],
      },
    },
  ],
  medications: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Medication',
    },
  ],
});

// exporting the model from above. To be referenced elsewhere as 'Dog'
module.exports = mongoose.model('Dog', DogSchema);
