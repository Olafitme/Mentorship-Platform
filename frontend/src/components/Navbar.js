import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout, loading } = useAuth();

  const handleLogout = () => {
    logout();
    alert('Logged out successfully.');
    navigate('/');
  };

  if (loading) {
    return (
      <nav style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
        Loading...
      </nav>
    );
  }

  return (
    <nav style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
      <Link to="/" style={{ marginRight: '10px' }}>Home</Link>

      {/* Not logged in */}
      {!user && (
        <>
          <Link to="/login" style={{ marginRight: '10px' }}>Login</Link>
          <Link to="/register" style={{ marginRight: '10px' }}>Register</Link>
        </>
      )}

      {/* Logged in */}
      {user && (
        <>
          {/* Admin Links */}
          {user.role.toLowerCase() === 'admin' && (
            <>
              <Link to="/admin" style={{ marginRight: '10px' }}>Admin Dashboard</Link>
            </>
          )}

          {/* Mentor Links */}
          {user.role.toLowerCase() === 'mentor' && (
            <>
              <Link to="/mentor" style={{ marginRight: '10px' }}>Mentor Dashboard</Link>
              <Link to="/mentor/availability" style={{ marginRight: '10px' }}>Set Availability</Link>
            </>
          )}

          {/* Mentee Links */}
          {user.role.toLowerCase() === 'mentee' && (
            <>
              <Link to="/mentee" style={{ marginRight: '10px' }}>Mentee Dashboard</Link>
              <Link to="/book-session" style={{ marginRight: '10px' }}>Book Session</Link>
              <Link to="/feedback" style={{ marginRight: '10px' }}>Feedback</Link>
              <Link to="/discover" style={{ marginRight: '10px' }}>Discover Mentors</Link>
              <Link to="/mentee-request" style={{ marginRight: '10px' }}>My Requests</Link>
            </>
          )}

          {/* Logout button always visible when logged in */}
          <button onClick={handleLogout} style={{ marginLeft: '10px' }}>
            Logout
          </button>
        </>
      )}
    </nav>
  );
};

export default Navbar;