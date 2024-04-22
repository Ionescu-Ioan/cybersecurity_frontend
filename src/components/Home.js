import React, { useState, useEffect } from "react";
import MovieList from "./MovieList";
import Navbar from "./Navbar";

function Home() {
  const [allMovies, setAllMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch("movie/all");
        const data = await response.json();
        setAllMovies(data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    fetchMovies();
  }, []);

  const loadSearchedMovies = (movieArray) => {
    setAllMovies(movieArray);
  };

  return (
    <div className="home-container">
      <Navbar
        customMessage="Movie Library"
        searchBarActive={true}
        loadSearchedMoviesHandler={loadSearchedMovies}
        inLibrary={false}
      />
      <MovieList movies={allMovies} ownedMovie={false} />
    </div>
  );
}

export default Home;
