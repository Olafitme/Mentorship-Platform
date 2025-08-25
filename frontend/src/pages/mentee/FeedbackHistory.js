import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FeedbackHistory = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [message, setMessage] = useState('');

  const userData = localStorage.getItem('user');
  const user = userData ? JSON.parse(userData) : null;

  useEffect(() => {
    if (!user || !user._id) {
      setMessage('⚠ Please log in to view feedback history.');
      return;
    }

    axios.get(http://localhost:5000/api/feedback/user/${user._id})
      .then((res) => {
        if (res.data.length === 0) {
          setMessage('No feedback found.');
        } else {
          setFeedbacks(res.data);
          setMessage('');
        }
      })
      .catch((err) => {
        console.error('Error fetching feedback history:', err);
        setMessage('Error loading feedback history.');
      });
  }, [user]);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Feedback History</h2>
      {message && <p>{message}</p>}

      {feedbacks.map((fb) => (
        <div key={fb._id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
          <p><strong>Session Date:</strong> {new Date(fb.sessionId.date).toLocaleString()}</p>
          <p><strong>Mentor:</strong> {fb.sessionId.mentor?.name}</p>
          <p><strong>Mentee:</strong> {fb.sessionId.mentee?.name}</p>
          <p><strong>Feedback:</strong> {fb.feedback}</p>
        </div>
      ))}
    </div>
  );
};

export default FeedbackHistory;