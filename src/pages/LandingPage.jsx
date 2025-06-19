import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LandingPage = () => {
  const { isAuthenticated } = useAuth();


  return (
    <>
      <div>LandingPage</div>

      {isAuthenticated ? (
        <Link to="/dashboard">
          <button>Go to Dashboard</button>
        </Link>
      ) : (
        <>
          <Link to="/login">
            <button>Login</button>
          </Link>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </>
      )}
    </>
  );
};

export default LandingPage;
