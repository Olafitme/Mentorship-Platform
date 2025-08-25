import React, { useEffect, useState } from 'react';

function MentorDiscovery() {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/mentors')
      .then((res) => res.json())
      .then((data) => {
        console.log('Fetched mentors:', data); 
        setMentors(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching mentors:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Available Mentors</h2>
      {loading ? (
        <p>Loading mentors...</p>
      ) : mentors.length === 0 ? (
        <p>No mentors found.</p>
      ) : (
        <ul>
          {mentors.map((mentor) => (
            <li key={mentor._id}>
              {mentor.name} — {mentor.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MentorDiscovery;