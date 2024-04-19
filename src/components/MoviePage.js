import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";

function MoviePage({ movieId }) {
  const [movie, setMovie] = useState();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(`/movie/view?movie_id=` + movieId);
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie:", error);
      }
    };
    fetchMovie();
  }, []);

  return (
    <div className="home-container">
      <Navbar customMessage="Enjoy the movie!" searchBarActive={false} />
    </div>
  );
}

export default MoviePage;
