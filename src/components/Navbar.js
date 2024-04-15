import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { IoClose, IoMenu } from "react-icons/io5";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { faSignIn } from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css";
import UserIcon from "./UserIcon.js";
import { useAuth } from "../hooks/useAuth";

function Navbar() {
  const { user, login, logout } = useAuth();
  const [searchText, setSearchText] = useState("");
  const [publicKey, setPublicKey] = useState("");
  const navigate = useNavigate();
  const handleGoToLibrary = () => {
    navigate("/library");
  };
  const handleOnHomeClick = () => {
    navigate("/");
  };
  const handleOnLoginClick = () => {
    navigate("/login");
  };
  const handleOnLogoutClick = () => {};
  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };
  const getTokenPayload = (token, cert) => {};
  const coerceRsaPublicKey = (pubKey) => {};
  useEffect(() => {
    const fetchPublicKey = async () => {
      try {
        const response = await fetch("/public_key");
        const data = await response.json();
        setPublicKey(data);
      } catch (error) {
        console.error("Error fetching public key:", error);
      }
    };
    fetchPublicKey();
  }, []);

  return (
    <header className="header">
      <nav className="nav container">
        <NavLink to="/" className="nav__logo" title="Home Page">
          Movie Library
        </NavLink>

        <div className={"nav__menu"} id="nav-menu">
          <ul className="nav__list">
            <li className="nav__item">
              <input
                type="text"
                placeholder="Search Movies"
                value={searchText}
                onChange={handleSearch}
                className="search-input"
              />
            </li>
            {user ? (
              <li className="nav__item">
                <button onClick={handleGoToLibrary} className="library-button">
                  Your Library
                </button>
              </li>
            ) : (
              <li className="nav__item"></li>
            )}

            <li className="nav__item">
              <button
                className="nav__link"
                onClick={handleOnHomeClick}
                title="Home"
              >
                <FontAwesomeIcon icon={faHome} />
              </button>
            </li>

            {user ? (
              <li className="nav__item">
                <button className="nav__link" onClick={logout} title="Sign Out">
                  <FontAwesomeIcon icon={faSignOut} />
                </button>
              </li>
            ) : (
              <li className="nav__item">
                <button
                  className="nav__link"
                  onClick={handleOnLoginClick}
                  title="Sign In"
                >
                  <FontAwesomeIcon icon={faSignIn} />
                </button>
              </li>
            )}

            {user ? (
              <li className="nav__item">
                <NavLink className="user_icon" title={`Hello, ${user.data}!`}>
                  <UserIcon userName={user.data} />
                </NavLink>
              </li>
            ) : (
              <li className="nav__item">
                <NavLink className="user_icon" title="Hello, guest!">
                  <FontAwesomeIcon icon={faUser} />
                </NavLink>
              </li>
            )}
          </ul>

          <div className="nav__close" id="nav-close">
            <IoClose />
          </div>
        </div>

        <div className="nav__toggle" id="nav-toggle">
          <IoMenu />
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
