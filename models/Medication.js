const mongoose = require('mongoose');

const MedicationSchema = new mongoose.Schema({
  nameGeneric: {
    type: String,
    required: true,
  },
  nameTrade: [
    {
      type: String,
    },
  ],
  use: [
    {
      type: String,
    },
  ],
  food: {
    type: Boolean,
    required: true,
  },
});

// exporting the model from above. To be referenced elsewhere as 'Medication'
module.exports = mongoose.model('Medication', MedicationSchema);
