// Movie.js
import React from "react";
import "./Movie.css";

const Movie = ({ title, price }) => {
  const handleBuy = () => {
    // Handle buying logic here
    console.log(`You bought ${title} for ${price}`);
  };

  return (
    <div className="movie-card">
      <h2>{title}</h2>
      <p>Price: ${price}</p>
      <button onClick={handleBuy}>Buy</button>
    </div>
  );
};

export default Movie;
