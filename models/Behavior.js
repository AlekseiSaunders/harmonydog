const mongoose = require('mongoose');

const BehaviorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    default: 'obedience',
    enum: ['obedience', ''],
  },
  difficulty: {
    type: String,
    default: 'easy',
    enum: ['easy', 'medium', 'advanced', 'specialized'],
  },
  description: {
    type: String,
  },
});

// exporting the model from above. To be referenced elsewhere as 'User'
module.exports = mongoose.model('Behavior', BehaviorSchema);
