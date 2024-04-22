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
          poster={movie.poster_image_url}
          price={movie.price}
          ownedMovie={ownedMovie}
          movieId={movie.id}
        />
      ))}
    </div>
  );
}

export default MovieList;
