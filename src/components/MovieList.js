import React from "react";
import Movie from "./Movie";
import "./MovieList.css";

function MovieList({ movies, ownedMovie }) {
  return (
    <div className="movie-list">
      {movies.map((movie, index) => (
        <Movie
          key={index}
          title={movie.title}
          //poster={movie.poster}
          poster="https://placehold.co/300x200"
          price={movie.price}
          ownedMovie={ownedMovie}
        />
      ))}
    </div>
  );
}

export default MovieList;
