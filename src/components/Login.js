import React from "react";
import { useState } from "react";
import "./Login.css";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClapperboard } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../hooks/useAuth";
import CustomFlashMessage from "./CustomFlashMessage";
import { useNavigate } from "react-router-dom";

function Login(props) {
  const [clicked, setClicked] = useState(false);
  const [failedLogin, setFailedLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("password");
  const [iconEye, setIcon] = useState(eyeOff);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { login } = useAuth();
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

  const onButtonClick = async () => {
    setClicked(true);
    const loginResult = await fetch("/login", {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      method: "POST",
      mode: "cors",
      body: JSON.stringify({
        username: email,
        password: password,
      }),
    });

    if (!loginResult.ok) {
      setFailedLogin(true);
      console.log("error");
    } else {
      const loginData = await loginResult.json();
      await login({ loginData });
    }
  };

  const onRegisterClick = () => {
    navigate("/register");
  };

  return (
    <div>
      {failedLogin ? (
        <CustomFlashMessage
          message="Login failed!"
          customClassName="flash-message danger"
        />
      ) : (
        <div></div>
      )}
      <div className={"mainContainer"}>
        <div className={"titleContainer"}>
          <div className={"LoginText"}>
            WELCOME!{" "}
            <FontAwesomeIcon
              icon={faClapperboard}
              style={{ marginRight: "5px" }}
            />
          </div>
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
          <span className="password-icon" onClick={handleToggle}>
            <Icon icon={iconEye} size={25} />
          </span>
          <label className="errorLabel">{passwordError}</label>
        </div>
        <br />
        <div className={"ButtonContainer"}>
          <button className="LoginButton" onClick={onButtonClick}>
            LOGIN
          </button>
        </div>
        <div className={"RegisterContainer"}>
          <span>
            Don't have an account?{" "}
            <a href="#" className="RegisterLink" onClick={onRegisterClick}>
              Register
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Login;
