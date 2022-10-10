const mongoose = require('mongoose');

const TipSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  tags: [
    {
      type: String,
    },
  ],
  image: {
    type: String,
    required: true,
  },
  cloudinaryId: {
    type: String,
    require: true,
  },
});

// exporting the model from above. To be referenced elsewhere as 'Class'
module.exports = mongoose.model('Tip', TipSchema);
