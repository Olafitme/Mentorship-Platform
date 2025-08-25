import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const skillsList = [
  'Leadership',
  'Communication',
  'Product Design',
  'Software Development',
  'Public Speaking',
  'Time Management',
  'UI/UX Design',
  'Data Analysis',
  'Video Editing',
  'Digital Marketing',
  'Cloud Computing',
  'Cybersecurity',
  'Artificial Intelligence',
  'Mobile App Development',
];

const ProfileForm = () => {
  const navigate = useNavigate();
  const { user, token, login } = useAuth(); 
  const [bio, setBio] = useState('');
  const [skills, setSkills] = useState([]);
  const [goals, setGoals] = useState('');

  useEffect(() => {
    if (!user || !token) {
      alert('Please log in first');
      navigate('/login');
    }
  }, [user, token, navigate]);

  const handleSkillChange = (e) => {
    const value = e.target.value;
    if (skills.includes(value)) {
      setSkills(skills.filter((s) => s !== value));
    } else {
      setSkills([...skills, value]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send profile update to backend
      const response = await axios.put(
        'http://localhost:5000/api/users/me/profile',
        { bio, skills, goals },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const updatedUser = {
        ...user,
        bio,
        skills,
        goals,
        profileComplete: true,
      };

      login(updatedUser, token);

      alert('✅ Profile updated successfully!');

      const role = updatedUser.role.toLowerCase();
      if (role === 'admin') navigate('/admin');
      else if (role === 'mentor') navigate('/mentor');
      else if (role === 'mentee') navigate('/mentee');
      else navigate('/');
    } catch (err) {
      console.error('❌ Error updating profile:', err.response?.data || err.message);
      alert('❌ Failed to update profile');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Complete Your Profile</h2>
      <form onSubmit={handleSubmit}>
        <label>Short Bio:</label><br />
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          rows="3"
          cols="50"
          required
        /><br /><br />

        <label>Select Skills:</label><br />
        {skillsList.map((skill) => (
          <label key={skill} style={{ marginRight: '10px' }}>
            <input
              type="checkbox"
              value={skill}
              checked={skills.includes(skill)}
              onChange={handleSkillChange}
            />
            {skill}
          </label>
        ))}

        <br /><br />
        <label>Goals:</label><br />
        <input
          type="text"
          value={goals}
          onChange={(e) => setGoals(e.target.value)}
          placeholder='e.g. "Improve product design skills"'
          required
        />

        <br /><br />
        <button type="submit">Save Profile</button>
      </form>
    </div>
  );
};

export default ProfileForm;