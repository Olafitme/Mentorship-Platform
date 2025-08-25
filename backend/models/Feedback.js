const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  sessionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Session',
    required: true,
  },
  feedback: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Feedback', feedbackSchema);