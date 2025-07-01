import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from "../context/UserContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(UserContext);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
