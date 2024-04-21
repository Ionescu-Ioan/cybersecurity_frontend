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
    }, 10000); // 10 seconds

    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <div id="session-expired-container">
      <p id="session-expired-message">
        Your session has expired, you will be logged out shortly.
      </p>
    </div>
  );
};

export default SessionExpired;
