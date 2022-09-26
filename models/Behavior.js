const mongoose = require('mongoose');

const BehaviorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    default: 'obedience',
    enum: ['obedience', 'house training', 'good dog citizen', 'travel dog', 'misc'],
  },
  difficulty: {
    type: String,
    default: 'easy',
    enum: ['easy', 'medium', 'advanced', 'specialized'],
  },
  description: {
    type: String,
  },
  bridge: {
    type: String,
  },
  cueVocal: {
    type: String,
  },
  cueVisual: {
    type: String,
  },
  behaviorPrior: {
    type: String,
  },
  behaviorSubsequent: {
    type: String,
  },
});

// exporting the model from above. To be referenced elsewhere as 'Behavior'
module.exports = mongoose.model('Behavior', BehaviorSchema);
