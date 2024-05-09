import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { IoClose, IoMenu } from "react-icons/io5";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { faSignIn } from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css";
import UserIcon from "./UserIcon.js";
import { useAuth } from "../hooks/useAuth";
import * as jose from "jose";
import CustomFlashMessage from "./CustomFlashMessage.js";

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

function Navbar({
  customMessage,
  searchBarActive,
  loadSearchedMoviesHandler,
  inLibrary,
}) {
  const { user, logout, CheckExpiredToken } = useAuth();
  const [payload, setPayload] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [enterPressed, setEnterPressed] = useState(false);

  const [showMenu, setShowMenu] = useState(false);

  const navigate = useNavigate();

  const handleGoToLibrary = () => {
    closeMenuOnMobile();
    navigate("/library");
  };

  const CheckExpirationTime = () => {
    if (!user || !user.data || !user.data.token) return;

    const payload = jose.decodeJwt(user.data.token);

    if (
      Math.floor(Date.now() / 1000) >
      parseInt(payload.created_at, 10) + parseInt(payload.expires_in, 10)
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handleClearClick = async () => {
    if (inLibrary) {
      setSearchText("");
      const response = await fetch("/movie/owned/like?title=", {
        headers: {
          Authorization: `Bearer ${user.data.token}`,
        },
        method: "GET",
        mode: "cors",
      });
      const data = await response.json();
      loadSearchedMoviesHandler(data);
    } else {
      setSearchText("");

      if (!CheckExpirationTime()) {
        const response = await fetch("/movie/like?title=");
        const data = await response.json();
        loadSearchedMoviesHandler(data);
      }
    }
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
    if (event.key === "Enter") {
      handleSearchEnter(inLibrary);
      setEnterPressed(true);
    }
  };

  const handleSearchEnter = async (inLibrary) => {
    if (inLibrary) {
      if (!CheckExpirationTime()) {
        const response = await fetch("/movie/owned/like?title=" + searchText, {
          headers: {
            Authorization: `Bearer ${user.data.token}`,
          },
          method: "GET",
          mode: "cors",
        });
        const data = await response.json();
        loadSearchedMoviesHandler(data);
      }
    } else {
      if (!CheckExpirationTime()) {
        const response = await fetch("/movie/like?title=" + searchText);
        const data = await response.json();
        loadSearchedMoviesHandler(data);
      }
    }
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
    CheckExpiredToken();
    const populateTokenPayload = () => {
      if (user) {
        const decodedPayload = getPayload(user.data.token);
        setPayload(decodedPayload);
      }
    };
    populateTokenPayload();
  }, [CheckExpiredToken, user]);

  return (
    <header className="header">
      <nav className="nav container">
        <b className="nav__logo">{customMessage}</b>

        <div
          className={`nav__menu ${showMenu ? "show-menu" : ""}`}
          id="nav-menu"
        >
          <ul className="nav__list">
            {searchBarActive ? (
              <li className="nav__item nav__item_search">
                {CheckExpirationTime() && enterPressed ? (
                  <CustomFlashMessage
                    message="Token expired!"
                    customClassName="flash-message danger"
                  />
                ) : (
                  <div></div>
                )}

                <input
                  type="text"
                  placeholder="Search movie by title"
                  value={searchText}
                  onChange={handleSearch}
                  className="search-input"
                  onKeyPress={handleKeyPress}
                  title="Press enter to search"
                />
                <div className="clear_button_container">
                  <FontAwesomeIcon
                    icon={faCircleXmark}
                    className="clear_button"
                    title="Clear search"
                    onClick={handleClearClick}
                  />
                </div>
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
