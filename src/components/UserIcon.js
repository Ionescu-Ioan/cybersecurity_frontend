import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function UserIcon({ userName }) {
  const { user, login, logout } = useAuth();

  const firstLetter = userName ? userName.charAt(0).toUpperCase() : "";
  const navigate = useNavigate();

  const handleUserIconClick = () => {
    if (user) {
      console.log("test");
      navigate("/profile");
    }
  };

  // Style for the icon container
  const iconStyle = {
    fontSize: "20px",
  };

  // return <div style={iconStyle}>{firstLetter}</div>;
  return <div style={iconStyle}>{firstLetter}</div>;
}

export default UserIcon;
