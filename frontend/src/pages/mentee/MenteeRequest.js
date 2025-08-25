import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const MenteeRequests = () => {
  const { token } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/sessions", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const pendingRequests = res.data.filter(
          (s) => s.status === "pending"
        );

        setRequests(pendingRequests);
      } catch (err) {
        console.error("Error fetching requests:", err);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchRequests();
  }, [token]);

  if (loading) return <p>Loading requests...</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">My Pending Session Requests</h2>
      {requests.length === 0 ? (
        <p>No pending requests.</p>
      ) : (
        <ul className="space-y-4">
          {requests.map((req) => (
            <li key={req._id} className="p-4 border rounded-lg shadow-sm">
              <p><strong>Mentor:</strong> {req.mentor?.name || "Unknown"}</p>
              <p><strong>Date:</strong> {new Date(req.date).toLocaleString()}</p>
              <p><strong>Status:</strong> {req.status}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MenteeRequests;