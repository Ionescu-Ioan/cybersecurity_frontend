// Movie.js
import React, { useState, useEffect } from "react";
import { useNavigate, createSearchParams } from "react-router-dom";
import "./Movie.css";

const Movie = ({ title, poster, price, ownedMovie, movieId }) => {
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
      navigate({
        pathname: "movie",
        search: createSearchParams({
          movie_id: "" + movieId,
        }).toString(),
      });
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
    <div
      className={movieClassName}
      onClick={() => handleCardClick()}
      title={title}
    >
      <h2>{title}</h2>
      <img src={poster} alt="movie poster"></img>
      <p>Price: ${price}</p>
      <button onClick={handleBuy}>Buy</button>
    </div>
  );
};

export default Movie;
