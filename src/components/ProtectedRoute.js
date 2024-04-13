// ProtectedRoute.js
import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from './AuthContext'; // Replace with your context import path

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />; // Redirect to login
  }

  return <Outlet />; // Render child component if authenticated
};

export default ProtectedRoute;
