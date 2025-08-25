const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  createRequest,
  getMenteeRequests,
  getMentorRequests,
  updateRequestStatus
} = require('../controllers/requestController');

router.post('/', protect, createRequest);

router.get('/mentee', protect, getMenteeRequests);

router.get('/mentor', protect, getMentorRequests);

router.put('/:id/status', protect, updateRequestStatus);

module.exports = router;