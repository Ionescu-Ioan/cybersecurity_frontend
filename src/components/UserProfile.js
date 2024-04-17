import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { useAuth } from "../hooks/useAuth";
import * as jose from "jose";





function UserProfile() {
  const [userData, setuserData] = useState(null);
  const { user } = useAuth();


  const getUserData = async() => 
{
    const res = await fetch ('/user/my');
    const resUserData = await res.json();
    setuserData(resUserData);
    console.log(resUserData);

}


  useEffect(() => {
    getUserData()
  }, []);

  return (
    <div className="profile-container">
      <Navbar />
      <div>{}</div>
    </div>
  );
}

export default UserProfile;
