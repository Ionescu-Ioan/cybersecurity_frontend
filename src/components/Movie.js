import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Movie.css";
import { useAuth } from "../hooks/useAuth";
import "./InteractiveButton";
import InteractiveButton from "./InteractiveButton";
import CustomFlashMessage from "./CustomFlashMessage";

const Movie = ({ title, poster, price, ownedMovie, movieId }) => {
  const { user } = useAuth();
  const [succeededToBuyMovie, setSucceededToBuyMovie] = useState(false);
  const [failedToBuyMovie, setFailedToBuyMovie] = useState(false);
  const [requestMessage, setRequestMessage] = useState("");
  const navigate = useNavigate();
  const movieCard = useRef();

  const handleBuy = async () => {
    const data = new FormData();
    data.append("movie_id", movieCard.current.id);
    const response = await fetch("/movie/buy", {
      headers: {
        Authorization: `Bearer ${user.data.token}`,
      },
      body: data,

      method: "POST",
      mode: "cors",
    });

    const res = await response.json();

    if (res.hasOwnProperty("err")) {
      setFailedToBuyMovie(true);

      setSucceededToBuyMovie(false);
      setRequestMessage(res["err"]);
      setTimeout(() => {
        setFailedToBuyMovie(false);
      }, 3000);
    } else {
      setFailedToBuyMovie(false);
      setSucceededToBuyMovie(true);
      setRequestMessage(res["msg"]);
      setTimeout(() => {
        setSucceededToBuyMovie(false);
      }, 3000);
    }
  };
  const handleGoToMovie = () => {
    if (ownedMovie) {
      navigate("/movie?movie_id=" + movieId);
    }
  };

  return (
    <div className="movie-card" title={title} id={movieId} ref={movieCard}>
      {succeededToBuyMovie ? (
        <CustomFlashMessage
          message="Movie successfully added in your library!"
          customClassName="flash-message success"
        />
      ) : null}
      {failedToBuyMovie ? (
        <CustomFlashMessage
          message={requestMessage}
          customClassName="flash-message danger"
        />
      ) : null}

      <h2>{title}</h2>
      <br></br>
      <img src={poster} alt="movie poster"></img>
      <br></br>
      <p>Price: ${price}</p>
      <br></br>
      {user ? (
        <InteractiveButton
          ownedMovie={ownedMovie}
          handleGoToMovie={handleGoToMovie}
          handleBuy={handleBuy}
        />
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Movie;
