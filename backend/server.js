const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/mentorship', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log(' MongoDB connected'))
.catch((err) => console.error(' MongoDB connection error:', err));

const userRoutes = require('./routes/userRoutes');
const sessionRoutes = require('./routes/sessionRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes'); 
const authRoutes = require('./routes/authRoutes');
const mentorRoutes = require('./routes/mentorRoutes'); 
const availabilityRoutes = require('./routes/availabilityRoutes');

app.use('/api/users', (req, res, next) => {
  console.log(` Request made to /api/users${req.path}`);
  next();
});
app.use('/api/users', userRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/feedback', feedbackRoutes); 
app.use('/api/auth', authRoutes);
app.use('/api/mentors', mentorRoutes); 
app.use('/api/availability', availabilityRoutes);

const requestRoutes = require('./routes/requestRoutes');
app.use('/api/requests', requestRoutes);

app.get('/', (req, res) => {
  res.send('🚀 API is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
 console.log(`Server running on port ${PORT}`); 
});