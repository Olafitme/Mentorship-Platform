const mongoose = require('mongoose');
const User = require('./models/User');

mongoose.connect('mongodb://localhost:27017/mentorship')
  .then(async () => {
    console.log('Connected to MongoDB');

    const result = await User.deleteMany({});
    console.log(`✅ Deleted ${result.deletedCount} user(s)`);

    mongoose.disconnect();
  })
  .catch(err => {
    console.error('❌ Error:', err);
  });