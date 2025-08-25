const User = require('../models/User');

exports.getMentors = async (req, res) => {
  try {
    const mentors = await User.find({ role: 'mentor' }).select('-password');
    console.log("Mentors from DB:", mentors);
    res.json(mentors);
  } catch (err) {
    console.error('Error fetching mentors:', err);
    res.status(500).json({ message: 'Failed to fetch mentors' });
  }
};

exports.setAvailability = async (req, res) => {
  try {
    const { dates } = req.body;
        res.json({ message: 'Availability set', dates });
  } catch (err) {
    console.error('Error setting availability:', err);
    res.status(500).json({ message: 'Failed to set availability' });
  }
};