import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AvailabilityForm = () => {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [availability, setAvailability] = useState({ date: "", time: "" });

  useEffect(() => {
    if (!user || !token) {
      alert("Please log in first");
      navigate("/login");
    } else if (user.role.toLowerCase() !== "mentor") {
      alert("Only mentors can set availability");
      navigate("/dashboard");
    }
  }, [user, token, navigate]);

  const handleChange = (e) => {
    setAvailability({ ...availability, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/availability",
        availability,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("✅ Availability saved successfully!");
      setAvailability({ date: "", time: "" });
    } catch (err) {
      console.error("❌ Error saving availability:", err.response?.data || err.message);
      alert("❌ Failed to save availability. Check console.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Set Your Availability</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label>Date:</label><br />
          <input
            type="date"
            name="date"
            value={availability.date}
            onChange={handleChange}
            required
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Time:</label><br />
          <input
            type="time"
            name="time"
            value={availability.time}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Save Availability</button>
      </form>
    </div>
  );
};

export default AvailabilityForm;