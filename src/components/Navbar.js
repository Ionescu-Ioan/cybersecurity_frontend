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
import * as jose from "jose";

const getPayload = (token) => {
  if (!token) {
    return null;
  }
  try {
    const payload = jose.decodeJwt(token);
    return payload;
  } catch (error) {
    console.error("Error decoding JWT:", error);
    return null;
  }
};

function Navbar({ customMessage, searchBarActive, loadSearchedMoviesHandler }) {
  const { user, login, logout } = useAuth();
  const [payload, setPayload] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [publicKey, setPublicKey] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const handleGoToLibrary = () => {
    closeMenuOnMobile();
    navigate("/library");
  };

  const handleOnHomeClick = () => {
    closeMenuOnMobile();
    navigate("/");
  };
  const handleOnLoginClick = () => {
    closeMenuOnMobile();
    navigate("/login");
  };

  const handleKeyPress = (event) => {
    if(event.key === 'Enter'){
        handleSearchEnter();
    }
  }

  const handleSearchEnter = async () => {
      const response = await fetch('/movie/like?title='+searchText);
      const data = await response.json();
      loadSearchedMoviesHandler(data);
  };

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  const closeMenuOnMobile = () => {
    if (window.innerWidth <= 1150) {
      setShowMenu(false);
    }
  };
  const handleUserIconClick = () => {
    closeMenuOnMobile();
    navigate("/profile");
  };

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

    const populateTokenPayload = () => {
      if (user) {
        const decodedPayload = getPayload(user.data.token);
        setPayload(decodedPayload);
      }
    };
    populateTokenPayload();
    console.log(customMessage);
  }, []);

  return (
    <header className="header">
      <nav className="nav container">
        <NavLink to="/" className="nav__logo" title="Home Page">
          {customMessage}
        </NavLink>

        <div
          className={`nav__menu ${showMenu ? "show-menu" : ""}`}
          id="nav-menu"
        >
          <ul className="nav__list">
            {searchBarActive ? (
              <li className="nav__item">
                <input
                  type="text"
                  placeholder="Search movie by title"
                  value={searchText}
                  onChange={handleSearch}
                  className="search-input"
                  onKeyPress={handleKeyPress}
                />
              </li>
            ) : (
              <li className="nav__item"></li>
            )}

            {user ? (
              <li className="nav__item">
                <button
                  onClick={handleGoToLibrary}
                  className="library-button"
                  title="Go to Your Library"
                >
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

            {user && payload ? (
              <li className="nav__item">
                <span
                  className="user_icon"
                  // title={`Hello, ${payload.first_name}!`}
                  title="Go to your profile"
                  onClick={handleUserIconClick}
                >
                  <>
                    <UserIcon userName={payload.first_name} />
                  </>
                </span>
              </li>
            ) : (
              <li className="nav__item">
                <NavLink className="user_icon" title="Hello, guest!">
                  <FontAwesomeIcon icon={faUser} />
                </NavLink>
              </li>
            )}
          </ul>

          <div className="nav__close" id="nav-close" onClick={toggleMenu}>
            <IoClose />
          </div>
        </div>

        <div className="nav__toggle" id="nav-toggle" onClick={toggleMenu}>
          <IoMenu />
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
