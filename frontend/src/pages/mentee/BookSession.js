import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

const BookSession = () => {  
  const { token } = useAuth();
  const [mentors, setMentors] = useState([]);
  const [selectedMentor, setSelectedMentor] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/mentors", {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch mentors");
        const data = await res.json();
        setMentors(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching mentors:", err);
        setMentors([]);
      }
    };

    if (token) fetchMentors();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedMentor || !date) return;

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ mentorId: selectedMentor, date }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to book session");
      }

      alert("✅ Session booked successfully!");

      setSelectedMentor("");
      setDate("");
    } catch (err) {
      console.error("Error booking session:", err);
      alert("❌ Failed to book session. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Book a Session</h2>
      <form onSubmit={handleSubmit}>
        <label>Choose Mentor:</label>
        <select
          value={selectedMentor}
          onChange={(e) => setSelectedMentor(e.target.value)}
          required
        >
          <option value="">-- Select a mentor --</option>
          {mentors.map((mentor) => (
            <option key={mentor._id} value={mentor._id}>
              {mentor.name}
            </option>
          ))}
        </select>

        <label>Date:</label>
        <input
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Booking..." : "Book Session"}
        </button>
      </form>
    </div>
  );
};

export default BookSession;