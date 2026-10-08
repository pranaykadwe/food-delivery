
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const location = useLocation();

  const token = localStorage.getItem("foodToken");
  const userData = localStorage.getItem("foodUser");

  // User login nahi hai
  if (!token || !userData) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  let user;

  try {
    user = JSON.parse(userData);
  } catch (error) {
    console.log("User data error:", error);

    localStorage.removeItem("foodToken");
    localStorage.removeItem("foodUser");

    return <Navigate to="/login" replace />;
  }

  // Sirf admin ke liye route
  if (adminOnly && user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;


