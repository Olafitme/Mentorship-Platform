from 'react';
import axios from 'axios';

const SubmitFeedback = () => {
  const [sessionId, setSessionId] = useState('');
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/feedback', {
        sessionId,
        rating,
        comment
      });

      setStatus('✅ Feedback submitted successfully!');
      setSessionId('');
      setRating('');
      setComment('');
    } catch (error) {
      console.error('❌ Feedback error:', error);
      setStatus('❌ Failed to submit feedback.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Submit Feedback</h2>
      {status && <p>{status}</p>}

      <form onSubmit={handleSubmit}>
        <label>Session ID:</label><br />
        <input
          type="text"
          value={sessionId}
          onChange={(e) => setSessionId(e.target.value)}
          required
        />
        <br /><br />

        <label>Rating (1-5):</label><br />
        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          required
        />
        <br /><br />

        <label>Comment:</label><br />
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows="4"
          cols="50"
        />
        <br /><br />

        <button type="submit">Submit Feedback</button>
      </form>
    </div>
  );
};

export default SubmitFeedback;