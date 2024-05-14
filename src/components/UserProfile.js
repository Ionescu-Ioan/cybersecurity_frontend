import React, { useState, useEffect, useRef } from "react";
import Navbar from "./Navbar";
import { useAuth } from "../hooks/useAuth";
import "./UserProfile.css";
import CustomFlashMessage from "./CustomFlashMessage";
import InformativeMessage from "./InformativeMessage";

function UserProfile() {
  const [userData, setuserData] = useState(null);
  const [profilePicURL, setProfilePicURL] = useState(
    "https://placehold.co/300x200"
  );
  const [profilePic, setProfilePic] = useState();
  const inputPic = useRef();

  const { user } = useAuth();
  const [fundsInput, setFundsInput] = useState("");
  const [succeededToAddFunds, setSucceededToAddFunds] = useState(false);
  const [failedToAddFunds, setFailedToAddFunds] = useState(false);

  const [succeededToUploadPic, setSucceededToUploadPic] = useState(false);
  const [failedToUploadPic, setFailedToUploadPic] = useState(false);

  const [requestMessage, setRequestMessage] = useState("");
  const [attemptedToAddFunds, setAttemptedToAddFunds] = useState(false);
  const inputElement = useRef();

  const handleConfirmUpload = async () => {
    const pic = new FormData();
    pic.append("profile_pic", profilePic);

    const uploadedPic = await fetch("/user/profile_pic/upload", {
      headers: {
        Authorization: `Bearer ${user.data.token}`,
      },
      body: pic,

      method: "POST",
      mode: "cors",
    });

    const picResponse = await uploadedPic.json();

    if (picResponse.hasOwnProperty("err")) {
      setFailedToUploadPic(true);

      setSucceededToUploadPic(false);
      setRequestMessage(picResponse["err"]);
      setTimeout(() => {
        setFailedToUploadPic(false);
      }, 2000);
    } else {
      setFailedToUploadPic(false);
      setSucceededToUploadPic(true);
      setRequestMessage(picResponse["msg"]);
      setTimeout(() => {
        setSucceededToUploadPic(false);
      }, 2000);
    }

    getUserData();

    inputPic.current.value = null;
  };
  const handleFundsValueChange = async (event) => {
    setFundsInput(event.target.value);
  };
  const handleAddFunds = async () => {
    setAttemptedToAddFunds(true);

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

    const response = await funds.json();

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

    setTimeout(() => {
      setAttemptedToAddFunds(false);
      if (inputElement.current) {
        inputElement.current.value = "";
      }
    }, 2000);

    getUserData();
  };
  const handleUploadProfilePic = (e) => {
    try {
      setProfilePic(e.target.files[0]);
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

    const pic = await fetch("/user/profile_pic/get", {
      headers: {
        Authorization: `Bearer ${user.data.token}`,
      },
      method: "GET",
      mode: "cors",
    });

    const resUserData = await res.json();
    const resPic = await pic.json();

    console.log(resPic);

    setProfilePicURL(resUserData[0].profile_picture_url);

    setuserData(resUserData);
  };

  useEffect(() => {
    getUserData();
  });

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
        <div className="user-profile-container">
          <div className="user-card">
            {succeededToUploadPic ? (
              <CustomFlashMessage
                message="Picture successfully uploaded!"
                customClassName="flash-message success"
              />
            ) : null}
            {failedToUploadPic ? (
              <CustomFlashMessage
                message={requestMessage}
                customClassName="flash-message danger"
              />
            ) : null}
            <br></br>
            <h2>Your Data</h2>
            <br></br>
            <img
              className="profile_pic"
              src={profilePicURL}
              alt="profile picture"
              title="Your profile picture"
            />
            <br></br>
            <p>First name: {userData[0].first_name}</p>
            <p>Last name: {userData[0].last_name}</p>
            <p>Email: {userData[0].email}</p>
            <br></br>

            <label htmlFor="myfile" title="Recommended picture size:300x200">
              Select profile picture:
            </label>
            <input
              type="file"
              id="myfile"
              onChange={handleUploadProfilePic}
              title="Choose file"
              className="file_input"
              ref={inputPic}
            />

            <br></br>
            <button onClick={handleConfirmUpload}>Upload picture</button>
          </div>
          <div className="user-card">
            {attemptedToAddFunds ? (
              <InformativeMessage
                message={fundsInput}
                customClassName="flash-message informative"
              />
            ) : (
              <div></div>
            )}
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
            <h2>Held funds: ${userData[0].funds}</h2>

            <br></br>
            <div className="add_funds_container">
              <input
                type="text"
                placeholder="Ex. 20"
                className="funds_input"
                onChange={handleFundsValueChange}
                title="Enter the amount of funds"
                ref={inputElement}
              />
              <p>$</p>
              <div className="add_funds_button" onClick={handleAddFunds}>
                Add funds
              </div>
            </div>

            <br></br>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default UserProfile;
