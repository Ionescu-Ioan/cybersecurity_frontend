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
import { useAuth } from "../hooks/useAuth";

function Register() {
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

  const { user, CheckExpiredToken } = useAuth();
  const navigate = useNavigate();

  if (user) {
    CheckExpiredToken();
  }

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
          setTimeout(() => {
            setFailedToRegister(false);
          }, 2000);
        } else {
          setFailedToRegister(false);
          setSucceededToRegister(true);
          setRequestMessage(json["msg"]);
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        }
      });
  };

  return (
    <div>
      <br></br>
      {succeededToRegister ? (
        <CustomFlashMessage
          message="Registered! - You will be redirect to Login page."
          customClassName="flash-message success"
        />
      ) : null}
      {failedToRegister ? (
        <CustomFlashMessage
          message={requestMessage}
          customClassName="flash-message danger"
        />
      ) : null}
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
            onPaste={(e) => e.preventDefault()}
            value={first_name}
            placeholder="First Name"
            onChange={(ev) => setFirstName(ev.target.value)}
            className={"inputBox"}
          />
        </div>

        <br />

        <div className={"inputContainer"}>
          <input
            id="lastNameInput"
            onKeyDown={onEnter}
            onPaste={(e) => e.preventDefault()}
            value={last_name}
            placeholder="Last Name"
            onChange={(ev) => setLastName(ev.target.value)}
            className={"inputBox"}
          />
        </div>

        <br />

        <div className={"inputContainer"}>
          <input
            id="emailInput"
            onKeyDown={onEnter}
            onPaste={(e) => e.preventDefault()}
            value={email}
            placeholder="Email"
            onChange={(ev) => setEmail(ev.target.value)}
            className={"inputBox"}
          />
        </div>

        <br />

        <div className={"inputContainer"}>
          <input
            id="passwordInput"
            onKeyDown={onEnter}
            onPaste={(e) => e.preventDefault()}
            value={password}
            placeholder="Password"
            onChange={(ev) => setPassword(ev.target.value)}
            className={"inputBox"}
            type={type}
          />
        </div>

        <br />

        <div className={"inputContainer"}>
          <input
            id="confirmedPasswordInput"
            onKeyDown={onEnter}
            onPaste={(e) => e.preventDefault()}
            value={confirmed_password}
            placeholder="Confirm Password"
            onChange={(ev) => setConfirmedPassword(ev.target.value)}
            className={"inputBox"}
            type={type}
          />
          <span className="password-icon" onClick={handleToggle}>
            <Icon icon={iconEye} size={25} />
          </span>
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
