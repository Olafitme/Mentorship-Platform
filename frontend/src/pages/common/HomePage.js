import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css'; 
const HomePage = () => {
  return (
    <div className="homepage-container">
      <h1>Welcome to Mentorship Platform</h1>

      <nav className="homepage-nav">
        <Link to="/login"><button>Login</button></Link>
        <Link to="/register"><button>Register</button></Link>
        
      </nav>
    </div>
  );
};

export default HomePage;