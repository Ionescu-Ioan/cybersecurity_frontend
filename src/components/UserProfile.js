import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { useAuth } from "../hooks/useAuth";
import * as jose from "jose";
import "./UserProfile.css";

function UserProfile() {
  const [userData, setuserData] = useState(null);
  const { user } = useAuth();

  const getUserData = async () => {
    const res = await fetch("/user/my", {
      headers: {
        Authorization: `Bearer ${user.data.token}`,
      },
      method: "GET",
      mode: "cors",
    });

    const resUserData = await res.json();

    console.log(resUserData);
    setuserData(resUserData);
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="profile-container">
      {userData ? (
        <Navbar
          customMessage={`Hello, ${userData[0].first_name}!`}
          searchBarActive={false}
        />
      ) : (
        <Navbar customMessage={""} searchBarActive={false} />
      )}
      {userData ? (
        <div className="user-card">
          <h2>Your Data</h2>
          <img src="https://placehold.co/300x200" alt="profile picture"></img>
          <p>First name: {userData[0].first_name}</p>
          <p>Last name: {userData[0].last_name}</p>
          <p>Email: {userData[0].email}</p>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default UserProfile;
