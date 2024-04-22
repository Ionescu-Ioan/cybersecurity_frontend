import React from "react";
import { useNavigate } from "react-router-dom";

function UserIcon({ userName }) {
  const firstLetter = userName ? userName.charAt(0).toUpperCase() : "";
  const navigate = useNavigate();

  const iconStyle = {
    fontSize: "20px",
  };

  return <div style={iconStyle}>{firstLetter}</div>;
}

export default UserIcon;
