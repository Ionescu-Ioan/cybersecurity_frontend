import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { useAuth } from "../hooks/useAuth";
import * as jose from "jose";

const getPayload = (token) => {
  if (!token) {
    return null;
  }
  try {
    const payload = jose.decodeJwt(token);
    return payload;
  } catch (error) {
    console.error("Error decoding JWT:", error);
    return null;
  }
};

function UserProfile() {
  const [payload, setPayload] = useState(null);
  const { user } = useAuth();
  useEffect(() => {
    const populateTokenPayload = () => {
      if (user) {
        const decodedPayload = getPayload(user.data.token);
        setPayload(decodedPayload);
      }
    };
    populateTokenPayload();
  }, []);

  return (
    <div className="profile-container">
      <Navbar />
      <div>payload.first_name</div>
    </div>
  );
}

export default UserProfile;
