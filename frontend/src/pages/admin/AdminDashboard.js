import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

const AdminDashboard = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [assignedPairs, setAssignedPairs] = useState([]);
  const [mentorId, setMentorId] = useState("");
  const [menteeId, setMenteeId] = useState("");

  useEffect(() => {
       const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5000/api/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    const storedPairs = JSON.parse(localStorage.getItem("assignedPairs")) || [];
    setAssignedPairs(storedPairs);

    fetchUsers();
  }, []);

  const handleAssign = async () => {
    if (!mentorId || !menteeId) return alert("Select both mentor and mentee");

    const newPair = { mentor: mentorId, mentee: menteeId };

    const updatedPairs = [...assignedPairs, newPair];
    setAssignedPairs(updatedPairs);
    localStorage.setItem("assignedPairs", JSON.stringify(updatedPairs));

    alert("Mentor assigned to mentee successfully!");
  };

  const mentors = users.filter((u) => u.role?.toLowerCase() === "mentor");
  const mentees = users.filter((u) => u.role?.toLowerCase() === "mentee");

  return (
    <div style={{ padding: "20px" }}>
      <h2>
        Welcome, {user?.name} ({user?.role})
      </h2>

      {/* View Users */}
      <h3>All Registered Users</h3>
      <ul>
        {users.map((u) => (
          <li key={u._id}>
            {u.name} ({u.email}) - <strong>{u.role}</strong>
          </li>
        ))}
      </ul>

      {/* Manual Mentor Assignment */}
      <h3>Manually Assign Mentor to Mentee</h3>
      <div>
        <label>Select Mentor: </label>
        <select value={mentorId} onChange={(e) => setMentorId(e.target.value)}>
          <option value="">-- Select Mentor --</option>
          {mentors.map((m) => (
            <option key={m._id} value={m._id}>
              {m.name} ({m.email})
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginTop: "10px" }}>
        <label>Select Mentee: </label>
        <select value={menteeId} onChange={(e) => setMenteeId(e.target.value)}>
          <option value="">-- Select Mentee --</option>
          {mentees.map((m) => (
            <option key={m._id} value={m._id}>
              {m.name} ({m.email})
            </option>
          ))}
        </select>
      </div>

      <button onClick={handleAssign} style={{ marginTop: "10px" }}>
        Assign
      </button>
    </div>
  );
};

export default AdminDashboard;