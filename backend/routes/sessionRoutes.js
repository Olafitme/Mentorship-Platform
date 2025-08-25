const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  bookSession,
  getSessions,
  updateSessionStatus
} = require('../controllers/sessionController');

router.post('/', protect, bookSession);

router.post('/mentee-request', protect, bookSession);

router.get('/', protect, getSessions);

router.put('/:id/status', protect, updateSessionStatus);

module.exports = router;