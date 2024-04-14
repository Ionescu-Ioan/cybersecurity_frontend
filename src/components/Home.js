import React, { useState, useEffect } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import MovieList from "./MovieList";

function Home(props) {
  const [allMovies, setAllMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [sortBy, setSortBy] = useState("");
  const API_URL = "http://your-api-domain.com/api/movies";
  const navigate = useNavigate();

  const sortMovies = (movies, sortBy) => {
    if (sortBy === "title") {
      return movies.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "date") {
      return movies.sort((a, b) => a.releaseDate - b.releaseDate);
    } else {
      return movies;
    }
  };

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  // Handle movie purchase logic (implementation omitted for brevity)
  const handleBuyMovie = (movie) => {
    // Add movie to user's library
  };

  // Handle library navigation logic (implementation omitted for brevity)
  const handleGoToLibrary = () => {
    navigate("/library");
  };

  const handleOpenMovie = (movie) => {
    // navigate to movie details page with movie id
  };

  return (
    <div className="home-container">
      <div className="top-bar">
        <h1>Movie Library</h1>
        <input
          type="text"
          placeholder="Search Movies"
          value={searchText}
          onChange={handleSearch}
          className="search-input"
        />
        <button onClick={handleGoToLibrary} className="library-button">
          Your Library
        </button>
      </div>
      <div className="movie-list">
        <MovieList allMovies />
      </div>
    </div>
  );
}

export default Home;
