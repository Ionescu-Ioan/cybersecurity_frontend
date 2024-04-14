import React from "react";
import { useState } from "react";
import "./Register.css";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard } from "@fortawesome/free-solid-svg-icons";
import CustomFlashMessage from "./CustomFlashMessage";
import { useNavigate } from "react-router-dom";

function Register(props) {
  const [clicked, setClicked] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [failedToRegister, setFailedToRegister] = useState(false);
  const [succeededToRegister, setSucceededToRegister] = useState(false);
  const [requestMessage, setRequestMessage] = useState("");
  const [confirmed_password, setConfirmedPassword] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [type, setType] = useState("password");
  const [iconEye, setIcon] = useState(eyeOff);
  const [emailError, setEmailError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const handleToggle = () => {
    if (type === "password") {
      setIcon(eye);
      setType("text");
    } else {
      setIcon(eyeOff);
      setType("password");
    }
  };

  const onButtonClick = () => {
    const data = new FormData();

    data.append("email", email);
    data.append("password", password);
    data.append("check_password", confirmed_password);
    data.append("first_name", first_name);
    data.append("last_name", last_name);

    console.log(data.getAll("email"));

    // for (const key of data.keys()) {
    //   console.log(key);
    // }

    setClicked(true);
    fetch("/user/register", {
      method: "POST",
      mode: "cors",
      body: data,
    })
      .then((data) => data.json())
      .then((json) => {
        if (json.hasOwnProperty("err")) {
          setFailedToRegister(true);
          setSucceededToRegister(false);
          setRequestMessage(json["err"]);
        } else {
          setFailedToRegister(false);
          setSucceededToRegister(true);
          setRequestMessage(json["msg"]);
          setTimeout(() => {
            navigate("/login");
          }, "3000");
        }
      });
  };

  return (
    <div>
      {succeededToRegister ? (
        <CustomFlashMessage
          message="Registered! - You will be redirect to Login page."
          customClassName="flash-message success"
        />
      ) : (
        <div></div>
      )}
      {failedToRegister ? (
        <CustomFlashMessage
          message={requestMessage}
          customClassName="flash-message danger"
        />
      ) : (
        <div></div>
      )}
      <div className={"mainContainer"}>
        <div className={"titleContainer"}>
          <div className={"RegisterText"}>
            REGISTER{" "}
            <FontAwesomeIcon
              icon={faAddressCard}
              style={{ marginRight: "5px" }}
            />
          </div>
        </div>

        <br />

        <div className={"inputContainer"}>
          <input
            value={first_name}
            placeholder="First Name"
            onChange={(ev) => setFirstName(ev.target.value)}
            className={"inputBox"}
          />
          <label className="errorLabel">{firstNameError}</label>
        </div>

        <br />

        <div className={"inputContainer"}>
          <input
            value={last_name}
            placeholder="Last Name"
            onChange={(ev) => setLastName(ev.target.value)}
            className={"inputBox"}
          />
          <label className="errorLabel">{lastNameError}</label>
        </div>

        <br />

        <div className={"inputContainer"}>
          <input
            value={email}
            placeholder="Email"
            onChange={(ev) => setEmail(ev.target.value)}
            className={"inputBox"}
          />
          <label className="errorLabel">{emailError}</label>
        </div>

        <br />

        <div className={"inputContainer"}>
          <input
            value={password}
            placeholder="Password"
            onChange={(ev) => setPassword(ev.target.value)}
            className={"inputBox"}
            type={type}
          />
          <label className="errorLabel">{passwordError}</label>
        </div>

        <br />

        <div className={"inputContainer"}>
          <input
            value={confirmed_password}
            placeholder="Confirm Password"
            onChange={(ev) => setConfirmedPassword(ev.target.value)}
            className={"inputBox"}
            type={type}
          />
          <span className="password-icon" onClick={handleToggle}>
            <Icon icon={iconEye} size={25} />
          </span>
          <label className="errorLabel">{passwordError}</label>
        </div>

        <br />

        <div className={"ButtonContainer"}>
          <button className="RegisterButton" onClick={onButtonClick}>
            SIGN UP
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;
