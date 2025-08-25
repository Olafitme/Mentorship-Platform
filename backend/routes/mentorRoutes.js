const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { getMentors, setAvailability } = require('../controllers/mentorController');

const router = express.Router();

router.get('/', protect, getMentors);

router.post('/availability', protect, setAvailability);

module.exports = router;