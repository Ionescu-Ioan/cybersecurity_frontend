import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import "./SessionExpired.css";

const SessionExpired = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  useEffect(() => {
    const timeout = setTimeout(() => {
      logout();
    }, 6000);

    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <div id="session-expired-container">
      <p id="session-expired-message">
        <h1>Your session has expired, you will be logged out shortly!</h1>
      </p>
    </div>
  );
};

export default SessionExpired;
