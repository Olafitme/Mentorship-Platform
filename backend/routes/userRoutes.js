const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { 
  updateProfile, 
  getProfile, 
  getUserById, 
  getAllMentors, 
  getAllMentees,
  getAllUsers
} = require('../controllers/userController');

router.get('/me', protect, getProfile);

router.put('/me/profile', protect, updateProfile);

router.get('/mentors', protect, getAllMentors);

router.get('/mentees', protect, getAllMentees);

router.get('/', protect, getAllUsers);

router.get('/:id', protect, getUserById);

module.exports = router;