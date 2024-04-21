import React, { useState, useEffect, useRef } from "react";
import Navbar from "./Navbar";
import { useAuth } from "../hooks/useAuth";
import * as jose from "jose";
import "./UserProfile.css";
import CustomFlashMessage from "./CustomFlashMessage";

function UserProfile() {
  const [userData, setuserData] = useState(null);
  const [profilePicURL, setProfilePicURL] = useState(
    "https://placehold.co/300x200"
  );
  const [profilePic, setProfilePic] = useState();
  const { user } = useAuth();
  const [fundsInput, setFundsInput] = useState("");
  const [succeededToAddFunds, setSucceededToAddFunds] = useState(false);
  const [failedToAddFunds, setFailedToAddFunds] = useState(false);
  const [requestMessage, setRequestMessage] = useState("");
  const inputElement = useRef();

  const handleConfirmUpload = async () => {};
  const handleFundsValueChange = async (event) => {
    setFundsInput(event.target.value);
  };
  const handleAddFunds = async () => {
    const data = new FormData();
    data.append("funds", fundsInput);
    const funds = await fetch("/user/add_funds", {
      headers: {
        Authorization: `Bearer ${user.data.token}`,
      },
      body: data,

      method: "POST",
      mode: "cors",
    });
    inputElement.current.value = "";
    const response = await funds.json();
    console.log(response);

    if (response.hasOwnProperty("err")) {
      setFailedToAddFunds(true);

      setSucceededToAddFunds(false);
      setRequestMessage(response["err"]);
      setTimeout(() => {
        setFailedToAddFunds(false);
      }, 2000);
    } else {
      setFailedToAddFunds(false);
      setSucceededToAddFunds(true);
      setRequestMessage(response["msg"]);
      setTimeout(() => {
        setSucceededToAddFunds(false);
      }, 2000);
    }

    getUserData();
  };
  const handleUploadProfilePic = async (e) => {
    console.log(e.target.files);
    try {
      const path = URL.createObjectURL(e.target.files[0]);
      setProfilePic(path);
    } catch (error) {
      console.log(error);
    }
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

    setProfilePicURL(resUserData[0].profile_picture_url);

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
          {succeededToAddFunds ? (
            <CustomFlashMessage
              message="Funds successfully added!"
              customClassName="flash-message success"
            />
          ) : null}
          {failedToAddFunds ? (
            <CustomFlashMessage
              message={requestMessage}
              customClassName="flash-message danger"
            />
          ) : null}
          <br></br>
          <h2>Your Data</h2>
          <img
            src={profilePicURL}
            alt="profile picture"
            title="Your profile picture"
          ></img>
          <br></br>
          <p>First name: {userData[0].first_name}</p>
          <p>Last name: {userData[0].last_name}</p>
          <p>Email: {userData[0].email}</p>
          <br></br>

          <div className="funds_container">
            <input
              type="text"
              placeholder="Ex. 20"
              className="funds_input"
              onChange={handleFundsValueChange}
              title="Enter the amount of funds"
              ref={inputElement}
            />
            <p>$</p>
            <div className="add_funds" onClick={handleAddFunds}>
              Add funds
            </div>
          </div>

          <p>Held funds: ${userData[0].funds}</p>

          <br></br>

          <label for="myfile" title="Recommended picture size:300x200">
            Select profile picture:
          </label>
          <input
            type="file"
            id="myfile"
            onChange={handleUploadProfilePic}
            title="Choose file"
            className="file_input"
          />

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
