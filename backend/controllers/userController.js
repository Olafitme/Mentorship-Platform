const User = require('../models/User');

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error('Error fetching profile:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { bio, skills, goals } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.bio = bio || user.bio;
    user.skills = skills || user.skills;
    user.goals = goals || user.goals;
    user.profileComplete = true;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      profileComplete: updatedUser.profileComplete,
      bio: updatedUser.bio,
      skills: updatedUser.skills,
      goals: updatedUser.goals,
    });
  } catch (err) {
    console.error('Error updating profile:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

const getAllMentors = async (req, res) => {
  try {
    const mentors = await User.find({ role: 'mentor' }).select('-password');
    res.json(mentors);
  } catch (err) {
    console.error('Error fetching mentors:', err);
    res.status(500).json({ message: 'Failed to fetch mentors' });
  }
};

const getAllMentees = async (req, res) => {
  try {
    const mentees = await User.find({ role: 'mentee' }).select('-password');
    res.json(mentees);
  } catch (err) {
    console.error('Error fetching mentees:', err);
    res.status(500).json({ message: 'Failed to fetch mentees' });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error('Error fetching user by ID:', err);
    res.status(500).json({ message: 'Failed to fetch user' });
  }
};

module.exports = {
  getProfile,
  updateProfile,
  getAllMentors,
  getAllMentees,
  getAllUsers,
  getUserById,
};