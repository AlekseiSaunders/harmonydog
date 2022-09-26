const mongoose = require('mongoose');

const ClassSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    default: 'beginner',
    enum: ['beginner', 'intermediate', 'advanced', 'specialized'],
  },
  behaviors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Behavior',
    },
  ],
  duration: {
    type: String,
    default: '1 hour',
  },
  length: {
    type: String,
    default: '4 weeks',
  },
});

// exporting the model from above. To be referenced elsewhere as 'Class'
module.exports = mongoose.model('Class', ClassSchema);
