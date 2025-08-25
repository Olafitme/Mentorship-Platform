import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

import HomePage from './pages/common/HomePage';
import Login from './pages/common/Login';
import Register from './pages/common/Register';
import ProfileForm from './pages/common/ProfileForm';

import AdminDashboard from './pages/admin/AdminDashboard';
import AdminSessionManager from './pages/admin/AdminSessionManager';

import MentorDashboard from './pages/mentor/MentorDashboard';
import MentorSessionRequests from './pages/mentor/MentorSessionRequests';
import AvailabilityForm from './pages/mentor/AvailabilityForm';

import MenteeDashboard from './pages/mentee/MenteeDashboard';
import BookSession from './pages/mentee/BookSession';
import FeedbackForm from './pages/mentee/FeedbackForm';
import MentorDiscovery from './pages/mentee/MentorDiscovery';
import MenteeRequest from './pages/mentee/MenteeRequest';

import Navbar from './components/Navbar';

const PrivateRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!user) return <Navigate to="/login" replace />;

  if (allowedRoles && !allowedRoles.includes(user.role.toLowerCase())) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const AppLayout = () => {
  const location = useLocation();
  const hideNavbar = location.pathname === "/";

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<ProfileForm />} />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <PrivateRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/sessions"
          element={
            <PrivateRoute allowedRoles={['admin']}>
              <AdminSessionManager />
            </PrivateRoute>
          }
        />

        {/* Mentor Routes */}
        <Route
          path="/mentor"
          element={
            <PrivateRoute allowedRoles={['mentor']}>
              <MentorDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/mentor/requests"
          element={
            <PrivateRoute allowedRoles={['mentor']}>
              <MentorSessionRequests />
            </PrivateRoute>
          }
        />
        <Route
          path="/mentor/availability"
          element={
            <PrivateRoute allowedRoles={['mentor']}>
              <AvailabilityForm />
            </PrivateRoute>
          }
        />

        {/* Mentee Routes */}
        <Route
          path="/mentee"
          element={
            <PrivateRoute allowedRoles={['mentee']}>
              <MenteeDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/book-session"
          element={
            <PrivateRoute allowedRoles={['mentee']}>
              <BookSession />
            </PrivateRoute>
          }
        />
        <Route
          path="/feedback"
          element={
            <PrivateRoute allowedRoles={['mentee']}>
              <FeedbackForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/discover"
          element={
            <PrivateRoute allowedRoles={['mentee']}>
              <MentorDiscovery />
            </PrivateRoute>
          }
        />
        <Route
          path="/mentee-request"
          element={
            <PrivateRoute allowedRoles={['mentee']}>
              <MenteeRequest />
            </PrivateRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;