const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');
const Session = require('../models/Session');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, async (req, res) => {
  try {
    const { sessionId, feedback } = req.body;

    if (!sessionId || !feedback)
      return res.status(400).json({ message: 'Session ID and feedback are required.' });

    const session = await Session.findById(sessionId);
    if (!session) return res.status(404).json({ message: 'Session not found' });

    const newFeedback = new Feedback({
      sessionId,
      feedback,
      user: req.user.id, 
    });

    await newFeedback.save();
    res.status(201).json({ message: 'Feedback submitted', feedback: newFeedback });
  } catch (err) {
    console.error('❌ Feedback error:', err);
    res.status(500).json({ error: 'Failed to submit feedback' });
  }
});

module.exports = router;