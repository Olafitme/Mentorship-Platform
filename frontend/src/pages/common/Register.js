import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('mentee');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        name,
        email,
        password,
        role,
      });

      alert(`✅ Registered successfully as ${role}`);
      navigate('/login');
    } catch (err) {
      alert('❌ Registration failed');
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label>Name:</label><br />
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Email:</label><br />
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Password:</label><br />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div>
          <label>Role:</label><br />
          <select value={role} onChange={(e) => setRole(e.target.value)} required>
            <option value="admin">Admin</option>
            <option value="mentor">Mentor</option>
            <option value="mentee">Mentee</option>
          </select>
        </div>

        <button type="submit" style={{ marginTop: '10px' }}>Register</button>
      </form>
    </div>
  );
}

export default Register;