const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

mongoose.connect('mongodb://localhost:27017/mentorship')
  .then(async () => {
    console.log('MongoDB connected');

    const hashedPassword = await bcrypt.hash('test123', 10);

    const newMentor = new User({
      name: 'Test Mentor',
      email: 'mentor@example.com',
      password: hashedPassword,
      role: 'mentor',
      bio: 'Helping people learn programming',
      skills: ['JavaScript', 'React'],
      goals: 'Mentor upcoming devs'
    });

    await newMentor.save();
    console.log('✅ Test mentor saved');
    mongoose.disconnect();
  })
  .catch(err => console.error('❌ Error saving mentor:', err));