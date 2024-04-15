// MovieList.js
import React from "react";
import Movie from "./Movie";
import "./MovieList.css";
import { useState, useEffect } from "react";

function MovieList() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch("movie/all");
        const data = await response.json();
        setMovies(data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    fetchMovies();
  }, []);

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
