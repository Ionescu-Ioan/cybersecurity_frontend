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

  const onEnter = (event) => {
    if (event.key === "Enter") {
      // Check which field has focus and move to the next one
      const focusedField = document.activeElement;
      if (first_name && last_name && email && password && confirmed_password) {
        onButtonClick();
      } else {
        if (focusedField === document.getElementById("firstNameInput")) {
          document.getElementById("lastNameInput").focus();
        } else if (focusedField === document.getElementById("lastNameInput")) {
          document.getElementById("emailInput").focus();
        } else if (focusedField === document.getElementById("emailInput")) {
          document.getElementById("passwordInput").focus();
        } else if (focusedField === document.getElementById("passwordInput")) {
          document.getElementById("confirmedPasswordInput").focus();
        }
      }
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
            id="firstNameInput"
            onKeyDown={onEnter}
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
            id="lastNameInput"
            onKeyDown={onEnter}
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
            id="emailInput"
            onKeyDown={onEnter}
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
            id="passwordInput"
            onKeyDown={onEnter}
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
            id="confirmedPasswordInput"
            onKeyDown={onEnter}
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
