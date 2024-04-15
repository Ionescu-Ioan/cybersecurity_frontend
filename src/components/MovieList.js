// MovieList.js
import React from "react";
import Movie from "./Movie";
import "./MovieList.css";
//import { useState, useEffect } from "react";

function MovieList({ movies }) {
  return (
    <div className="movie-list">
      {movies.map((movie, index) => (
        <Movie
          key={index}
          title={movie.title}
          poster={movie.poster}
          price={movie.price}
        />
      ))}
    </div>
  );
}

export default MovieList;
