import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { useAuth } from "../hooks/useAuth";
import * as jose from "jose";

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
    console.log("test");
    // const resUserData = await res.json();
    // setuserData(resUserData);
    // console.log(resUserData);
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="profile-container">
      {/* <Navbar customMessage={`Hello, ${userData[0].first_name}!`} /> */}
      <Navbar customMessage={`Hello, test!`} />
      <div>{}</div>
    </div>
  );
}

export default UserProfile;
