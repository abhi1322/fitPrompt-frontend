import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const ProtectedRoute = ({ children, requireProfile = false }) => {
  const { token, user } = useAuth();
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If we're on the complete-profile page and profile is completed, redirect to dashboard
  if (location.pathname === "/complete-profile" && user?.profileCompleted) {
    return <Navigate to="/dashboard" replace />;
  }

  // If we're on a page that requires profile completion and profile is not completed
  if (requireProfile && !user?.profileCompleted) {
    return <Navigate to="/complete-profile" replace />;
  }

  return children;
};
