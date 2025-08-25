import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminSessions = () => {
  const [sessions, setSessions] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/sessions')
      .then((res) => setSessions(res.data))
      .catch((err) => {
        console.error('Error fetching sessions:', err);
        setMessage('❌ Failed to load sessions.');
      });
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>All Booked Sessions</h2>
      {message && <p>{message}</p>}

      <table border="1" cellPadding="10" style={{ marginTop: '20px' }}>
        <thead>
          <tr>
            <th>Mentee</th>
            <th>Mentor</th>
            <th>Date</th>
            <th>Message</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {sessions.map((session) => (
            <tr key={session._id}>
              <td>{session.mentee?.name || 'N/A'}</td>
              <td>{session.mentor?.name || 'N/A'}</td>
              <td>{new Date(session.date).toLocaleString()}</td>
              <td>{session.message}</td>
              <td>{session.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminSessions;