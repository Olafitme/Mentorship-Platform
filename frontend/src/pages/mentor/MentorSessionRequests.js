import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import FeedbackForm from "../mentee/FeedbackForm";

const MentorSessionRequests = () => {
  const { user, token } = useAuth();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchSessions = async () => {
    if (!user || !token) return;
    try {
      const res = await axios.get("http://localhost:5000/api/sessions", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const mentorSessions = res.data.filter(
        (session) => session.mentor._id === user._id
      );
      setSessions(mentorSessions);
      if (mentorSessions.length === 0) setError("No session requests yet.");
      else setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to load sessions.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, [user, token]);

  const updateStatus = async (sessionId, status) => {
    try {
      await axios.put(
        `http://localhost:5000/api/sessions/${sessionId}/status`,
        { status }, // must match backend
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSessions((prev) =>
        prev.map((session) =>
          session._id === sessionId ? { ...session, status } : session
        )
      );
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Failed to update session status.");
    }
  };

  const [showFeedback, setShowFeedback] = useState(null);

  if (loading) return <p>Loading sessions...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Mentor Session Requests</h2>
      {sessions.map((session) => (
        <div
          key={session._id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <p>
            <strong>Mentee:</strong> {session.mentee?.name} (
            {session.mentee?.email})
          </p>
          <p>
            <strong>Date:</strong> {new Date(session.date).toLocaleString()}
          </p>
          <p>
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
          </p>

          {session.status === "pending" && (
            <div style={{ marginTop: "5px" }}>
              <button
                onClick={() => updateStatus(session._id, "approved")}
                style={{ marginRight: "10px" }}
              >
                Approve
              </button>
              <button onClick={() => updateStatus(session._id, "declined")}>
                Decline
              </button>
            </div>
          )}

          <div style={{ marginTop: "10px" }}>
            <button onClick={() => setShowFeedback(session._id)}>
              Submit Feedback
            </button>
            {showFeedback === session._id && (
              <FeedbackForm sessionId={session._id} />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MentorSessionRequests;