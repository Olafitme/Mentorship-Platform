import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const FeedbackForm = ({ sessionId }) => {
  const { user, token } = useAuth();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !sessionId) {
      alert('Invalid user or session.');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          sessionId,
          feedback: `Rating: ${rating} | Comment: ${comment}`,
          userId: user._id, 
        }),
      });

      if (!res.ok) throw new Error('Failed to submit feedback');

      setStatus('✅ Thank you for your feedback!');
      setRating(0);
      setComment('');
    } catch (err) {
      console.error(err);
      setStatus('❌ Failed to submit feedback.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Session Feedback</h2>
      {status && <p>{status}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Rating (1–5):</label><br />
          <input
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            required
          />
        </div>
        <div style={{ marginTop: '10px' }}>
          <label>Comment:</label><br />
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            cols={50}
            required
          />
        </div>
        <button type="submit" style={{ marginTop: '10px' }}>Submit Feedback</button>
      </form>
    </div>
  );
};

export default FeedbackForm;