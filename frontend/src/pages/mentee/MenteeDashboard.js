import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import FeedbackForm from "./FeedbackForm";

const MenteeDashboard = () => {
  const { user, token } = useAuth();
  const [sessions, setSessions] = useState([]);
  const [message, setMessage] = useState("");
  const [showFeedback, setShowFeedback] = useState(null);

  const fetchSessions = async () => {
    if (!user || !token) return;
    try {
      const res = await axios.get(
        "http://localhost:5000/api/sessions",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSessions(res.data);
      if (res.data.length === 0) setMessage("No sessions booked yet.");
      else setMessage("");
    } catch (err) {
      console.error(err);
      setMessage("Error fetching sessions.");
    }
  };

  useEffect(() => {
    fetchSessions();
  }, [user]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Welcome, {user?.name} ({user?.role})</h2>

      <h3>Your Sessions</h3>
      {message && <p>{message}</p>}
      <ul>
        {sessions.map((session) => (
          <li key={session._id} style={{ marginBottom: "10px" }}>
            <strong>Mentor:</strong> {session.mentor.name} ({session.mentor.email}) <br />
            <strong>Date:</strong> {new Date(session.date).toLocaleString()} <br />
            <strong>Status:</strong>{" "}
            <span
              style={{
                color:
                  session.status === "approved"
                    ? "green"
                    : session.status === "declined"
                    ? "red"
                    : "gray",
              }}
            >
              {session.status}
            </span>
            <br />
            {/* Show feedback form */}
            <button onClick={() => setShowFeedback(session._id)}>
              Submit Feedback
            </button>
            {showFeedback === session._id && (
              <FeedbackForm sessionId={session._id} />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenteeDashboard;