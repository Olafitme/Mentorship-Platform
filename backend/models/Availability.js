const mongoose = require('mongoose');

const availabilitySchema = new mongoose.Schema({
  mentor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
});

module.exports = mongoose.model('Availability', availabilitySchema);