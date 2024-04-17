import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function UserIcon({ userName }) {
  const { user, login, logout } = useAuth();


  const firstLetter = userName ? userName.charAt(0).toUpperCase() : "";
  const navigate = useNavigate();

  const handleUserIconClick = () => {
    if (user) 
        {
          console.log('test');
          navigate("/profile");

        }
  }

  // Style for the icon container
  const iconStyle = {
    backgroundColor: "#5f5b5b", // Customize background color
    color: "#fff", // Customize text color
    borderRadius: "50%", // Make it a circle
    width: "40px",
    height: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
  };

  return <div style={iconStyle}>{firstLetter}</div>;
}

export default UserIcon;
