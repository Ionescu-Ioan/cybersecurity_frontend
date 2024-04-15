import React from "react";

function UserIcon({ userName }) {
  // Function to extract the first letter of the user's name
  const firstLetter = userName ? userName.charAt(0).toUpperCase() : "";

  // Style for the icon container
  const iconStyle = {
    backgroundColor: "#ccc", // Customize background color
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
