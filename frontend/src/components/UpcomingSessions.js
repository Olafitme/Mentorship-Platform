import React, { useEffect, useState } from "react";
import axios from "axios";

const UpcomingSessions = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/api/sessions/upcoming", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSessions(res.data);
      } catch (err) {
        console.error("Error fetching upcoming sessions:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSessions();
  }, []);

  if (loading) return <p>Loading upcoming sessions...</p>;
  if (!sessions.length) return <p>No upcoming sessions found.</p>;

  return (
    <div>
      <h2>Upcoming Sessions</h2>
      <ul>
        {sessions.map((session) => (
          <li key={session._id}>
            <strong>{session.topic}</strong> with{" "}
            {session.mentor?.name || "Mentor"} on{" "}
            {new Date(session.date).toLocaleDateString()} at{" "}
            {session.time}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UpcomingSessions;