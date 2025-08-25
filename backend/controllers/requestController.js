const Request = require('../models/Request');
exports.createRequest = async (req, res) => {
  try {
    const { mentorId } = req.body;

    const existing = await Request.findOne({
      mentee: req.user._id,
      mentor: mentorId,
    });

    if (existing) {
      return res.status(400).json({ message: 'Request already sent to this mentor' });
    }

    const request = await Request.create({
      mentee: req.user._id,
      mentor: mentorId,
      status: 'pending',
    });

    res.status(201).json(request);
  } catch (err) {
    console.error('Error creating request:', err);
    res.status(500).json({ message: 'Failed to create request' });
  }
};

exports.getMenteeRequests = async (req, res) => {
  try {
    const requests = await Request.find({ mentee: req.user._id })
      .populate('mentor', 'name email');
    res.json(requests);
  } catch (err) {
    console.error('Error fetching mentee requests:', err);
    res.status(500).json({ message: 'Failed to fetch requests' });
  }
};

exports.getMentorRequests = async (req, res) => {
  try {
    const requests = await Request.find({ mentor: req.user._id })
      .populate('mentee', 'name email');
    res.json(requests);
  } catch (err) {
    console.error('Error fetching mentor requests:', err);
    res.status(500).json({ message: 'Failed to fetch requests' });
  }
};

exports.updateRequestStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const request = await Request.findById(id);
    if (!request) return res.status(404).json({ message: 'Request not found' });

    if (request.mentor.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    request.status = status;
    await request.save();

    res.json(request);
  } catch (err) {
    console.error('Error updating request:', err);
    res.status(500).json({ message: 'Failed to update request' });
  }
};