// Movie.js
import React, { useState, useEffect } from "react";
import { useNavigate, createSearchParams } from "react-router-dom";
import "./Movie.css";

const Movie = ({ title, poster, price, ownedMovie, movieId }) => {
  const [isMovieOwned, setIsMovieOwned] = useState(false);
  const [movieClassName, setMovieClassName] = useState("movie-card");
  const navigate = useNavigate();
  const handleBuy = () => {
    if (!ownedMovie) {
      alert(`You bought ${title} for ${price} bucks!`);
    }

    // Handle buying logic here
    //console.log(`You bought ${title} for ${price}`);
  };
  const handleGoToMovie = () => {
    if (isMovieOwned) {
      navigate({
        pathname: `/movie/${movieId}`,
        // search: createSearchParams({
        //   movie_id: "" + movieId,
        // }).toString(),
      });
    }
  };

  useEffect(() => {}, []);

  return (
    <div className="movie-card" title={title}>
      <h2>{title}</h2>
      <img src={poster} alt="movie poster"></img>
      <p>Price: ${price}</p>
      {ownedMovie ? (
        <button onClick={handleGoToMovie}>Go to movie</button>
      ) : (
        <button onClick={handleBuy}>Buy</button>
      )}
    </div>
  );
};

export default Movie;
