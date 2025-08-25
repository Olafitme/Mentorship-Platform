import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminSessionManager = () => {
  const [sessions, setSessions] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/sessions') 
      .then((res) => {
        setSessions(res.data);
        if (res.data.length === 0) {
          setMessage('No sessions found.');
        }
      })
      .catch((err) => {
        console.error('Error fetching sessions:', err);
        setMessage('Failed to fetch sessions.');
      });
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>All Session Records</h2>
      {message && <p>{message}</p>}

      {sessions.map((session) => (
        <div
          key={session._id}
          style={{
            border: '1px solid #ccc',
            padding: '15px',
            marginBottom: '10px',
            borderRadius: '8px',
          }}
        >
          <p><strong>Mentor:</strong> {session.mentor}</p>
          <p><strong>Mentee:</strong> {session.mentee}</p>
          <p><strong>Date:</strong> {new Date(session.date).toLocaleString()}</p>
          <p><strong>Message:</strong> {session.message}</p>
          <p><strong>Status:</strong> {session.status}</p>
        </div>
      ))}
    </div>
  );
};

export default AdminSessionManager;