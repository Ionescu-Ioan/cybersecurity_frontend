import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { useAuth } from "../hooks/useAuth";
import * as jose from "jose";
import "./UserProfile.css";

function UserProfile() {
  const [userData, setuserData] = useState(null);
  const [profilePicURL, setProfilePicURL] = useState(
    "https://placehold.co/300x200"
  );
  const [profilePic, setProfilePic] = useState();
  const { user } = useAuth();

  const handleConfirmUpload = async () => {};
  const handleUploadProfilePic = async (e) => {
    console.log(e.target.files);
    try {
      const path = URL.createObjectURL(e.target.files[0]);
      setProfilePic(path);
    } catch (error) {
      console.log(error);
    }
  };

  const loadProfilePic = async () => {
    setProfilePicURL("https://placehold.co/300x200");
  };
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
    loadProfilePic();
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
          <img src={profilePicURL} alt="profile picture"></img>
          <br></br>
          <p>First name: {userData[0].first_name}</p>
          <p>Last name: {userData[0].last_name}</p>
          <p>Email: {userData[0].email}</p>
          <br></br>
          <input type="file" onChange={handleUploadProfilePic} />
          <br></br>
          <button onClick={handleConfirmUpload}>Upload picture</button>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default UserProfile;
