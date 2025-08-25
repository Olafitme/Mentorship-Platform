const Availability = require('../models/Availability'); 

exports.createAvailability = async (req, res) => {
  try {
    const { date, time } = req.body;
    const mentorId = req.user._id;

    if (!date || !time) {
      return res.status(400).json({ message: 'Date and time are required' });
    }

    const availability = await Availability.create({ mentor: mentorId, date, time });
    res.status(201).json(availability);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to save availability' });
  }
};

exports.getAvailability = async (req, res) => {
  try {
    const mentorId = req.user._id;
    const slots = await Availability.find({ mentor: mentorId });
    res.json(slots);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch availability' });
  }
};