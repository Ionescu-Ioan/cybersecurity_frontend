// Movie.js
import React from "react";
import "./Movie.css";

const Movie = ({ title, poster, price }) => {
  const handleBuy = () => {
    // Handle buying logic here
    console.log(`You bought ${title} for ${price}`);
  };

  return (
    <div className="movie-card">
      <h2>{title}</h2>
      <img src={poster} alt="movie poster"></img>
      <p>Price: ${price}</p>
      <button onClick={handleBuy}>Buy</button>
    </div>
  );
};

export default Movie;
