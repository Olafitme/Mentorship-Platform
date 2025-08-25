const Feedback = require('../models/Feedback');

exports.submitFeedback = async (req, res) => {
  const { sessionId, feedback } = req.body;

  if (!sessionId || !feedback) {
    return res.status(400).json({ error: 'Session ID and feedback are required' });
  }

  try {
    const newFeedback = new Feedback({ sessionId, feedback });
    await newFeedback.save();
    res.status(201).json({ message: 'Feedback submitted successfully' });
  } catch (error) {
    console.error('Error saving feedback:', error);
    res.status(500).json({ error: 'Failed to save feedback' });
  }
};