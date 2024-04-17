import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { useAuth } from "../hooks/useAuth";
import * as jose from "jose";

function UserProfile() {
  const [userData, setuserData] = useState(null);
  const { user } = useAuth();

  const getUserData = async () => {

    const res = await fetch("/user/my2", {
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
       {userData ? <Navbar customMessage={`Hello, ${userData[0].first_name}!`} /> : <Navbar customMessage={''} />}
      <div>{}</div>
    </div>
  );
}

export default UserProfile;
