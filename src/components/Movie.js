// Movie.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Movie.css";

const Movie = ({ title, poster, price, ownedMovie }) => {
  const [isMovieOwned, setIsMovieOwned] = useState(false);
  const [movieClassName, setMovieClassName] = useState("movie-card");
  const navigate = useNavigate();
  const handleBuy = () => {
    alert(`You bought ${title} for ${price} bucks!`);
    // Handle buying logic here
    //console.log(`You bought ${title} for ${price}`);
  };
  const handleCardClick = () => {
    if (isMovieOwned) {
      navigate("movie/movie_id");
    } else {
    }
  };

  useEffect(() => {
    const findMovieType = async () => {
      setIsMovieOwned(ownedMovie);
      if (isMovieOwned) {
        setMovieClassName("movie-card owned");
      }
    };
    findMovieType();
  }, [isMovieOwned, ownedMovie]);

  return (
    <div className={movieClassName} onClick={() => handleCardClick()}>
      <h2>{title}</h2>
      <img src={poster} alt="movie poster"></img>
      <p>Price: ${price}</p>
      <button onClick={handleBuy}>Buy</button>
    </div>
  );
};

export default Movie;
