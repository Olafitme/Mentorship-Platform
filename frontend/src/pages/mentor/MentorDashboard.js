import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import FeedbackForm from "../mentee/FeedbackForm";

const MentorDashboard = () => {
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
      if (res.data.length === 0) setMessage("No session requests yet.");
      else setMessage("");
    } catch (err) {
      console.error(err);
      setMessage("Error fetching sessions.");
    }
  };

  useEffect(() => {
    fetchSessions();
  }, [user]);

  const respondToSession = async (sessionId, status) => {
    try {
      await axios.put(
        `http://localhost:5000/api/sessions/${sessionId}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchSessions();
    } catch (err) {
      console.error(err);
      alert("Failed to update session status.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Welcome, {user?.name} ({user?.role})</h2>

      <h3>Your Session Requests</h3>
      {message && <p>{message}</p>}
      <ul>
        {sessions.map((session) => (
          <li key={session._id} style={{ marginBottom: "10px" }}>
            <strong>Mentee:</strong> {session.mentee.name} ({session.mentee.email}) <br />
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
            {session.status === "pending" && (
              <>
                <button onClick={() => respondToSession(session._id, "approved")}>
                  Approve
                </button>
                <button
                  onClick={() => respondToSession(session._id, "declined")}
                  style={{ marginLeft: "5px" }}
                >
                  Decline
                </button>
              </>
            )}
            <br />
            {/* Feedback */}
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

export default MentorDashboard;