import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { updateSessionStatus } from '../../utils/sessionApi';

const SessionList = () => {
  const [sessions, setSessions] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/sessions')
      .then((res) => setSessions(res.data))
      .catch((err) => {
        console.error('Error loading sessions', err);
        setMessage('Failed to load sessions');
      });
  }, []);

  const handleStatusUpdate = async (id, status) => {
    try {
      const updated = await updateSessionStatus(id, status);
      setSessions((prev) =>
        prev.map((s) => (s._id === id ? { ...s, status: updated.session.status } : s))
      );
    } catch (err) {
      setMessage('Failed to update session status');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Session Requests</h2>
      {message && <p>{message}</p>}

      {sessions.map((session) => (
        <div key={session._id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
          <p>
            <strong>Mentee:</strong> {session.mentee?.name} <br />
            <strong>Date:</strong> {new Date(session.date).toLocaleString()} <br />
            <strong>Status:</strong> {session.status}
          </p>
          {session.status === 'pending' && (
            <>
              <button onClick={() => handleStatusUpdate(session._id, 'approved')}>Approve</button>{' '}
              <button onClick={() => handleStatusUpdate(session._id, 'declined')}>Decline</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default SessionList;