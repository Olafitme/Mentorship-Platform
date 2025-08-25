const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { createAvailability, getAvailability } = require('../controllers/availabilityController');

router.post('/', protect, createAvailability);

router.get('/', protect, getAvailability);

module.exports = router;