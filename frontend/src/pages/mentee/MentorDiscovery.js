import React, { useEffect, useState } from 'react';

function MentorDiscovery() {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const token = localStorage.getItem("token");

  fetch("http://localhost:5000/api/mentors", {
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(data => {
      console.log("API response:", data);

      if (Array.isArray(data)) {
        setMentors(data);
      } else {
        console.error("Expected an array, got:", data);
        setMentors([]); 
      }

      setLoading(false);
    })
    .catch(err => {
      console.error("Error fetching mentors:", err);
      setLoading(false);
    });
}, []);

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Available Mentors</h2>
      {loading ? (
        <p>Loading mentors...</p>
      ) : mentors.length === 0 ? (
        <p>No mentors found.</p>
      ) : (
        <ul>
          {mentors.map((mentor) => (
            <li key={mentor._id}>
              <strong>{mentor.name}</strong> — {mentor.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MentorDiscovery;