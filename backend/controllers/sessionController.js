const Session = require('../models/Session');
exports.bookSession = async (req, res) => {
  try {
    const { mentorId, date, time } = req.body;

    const session = await Session.create({
      mentee: req.user._id,
      mentor: mentorId,
      date,
      time,
      status: 'pending'
    });

    res.status(201).json(session);
  } catch (err) {
    console.error('Error booking session:', err);
    res.status(500).json({ message: 'Failed to book session' });
  }
};

exports.getSessions = async (req, res) => {
  try {
    let sessions;

    if (req.user.role === 'mentor') {
      sessions = await Session.find({ mentor: req.user._id })
        .populate('mentee', 'name email');
    } else if (req.user.role === 'mentee') {
      sessions = await Session.find({ mentee: req.user._id })
        .populate('mentor', 'name email');
    } else if (req.user.role === 'admin') {
      sessions = await Session.find()
        .populate('mentee', 'name email')
        .populate('mentor', 'name email');
    }

    res.json(sessions);
  } catch (err) {
    console.error('Error fetching sessions:', err);
    res.status(500).json({ message: 'Failed to fetch sessions' });
  }
};

exports.updateSessionStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; 
    const session = await Session.findById(id);
    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    if (session.mentor.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    session.status = status;
    await session.save();

    res.json(session);
  } catch (err) {
    console.error('Error updating session status:', err);
    res.status(500).json({ message: 'Failed to update session' });
  }
};