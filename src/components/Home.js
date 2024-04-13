import React, { useState, useEffect } from 'react';
import './Home.css';
import { Link } from 'react-router-dom';



function Home (props) {
  const [allMovies, setAllMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [sortBy, setSortBy] = useState('');
  const API_URL = 'http://your-api-domain.com/api/movies';

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('movie/all');
        const data = await response.json();
        setAllMovies(data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, ['movie/all']);

  const sortMovies = (movies, sortBy) => {
    if (sortBy === 'title') {
      return movies.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'date') {
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
    // navigate to library component
  };

  const handleOpenMovie = (movie) => {
    // navigate to movie details page with movie id
  };

  return (
    <div className="home-container">
      <div className="top-bar">
        <h1>Movie Library</h1>
        <div className="search-and-sort">
          <input
            type="text"
            placeholder="Search Movies"
            value={searchText}
            onChange={handleSearch}
            className="search-input"
          />
          <span className="sort-label">Sort By:</span>
          <select value={sortBy} onChange={handleSortChange} className="sort-select">
            {/* Initial "None" option with empty value for hiding */}
            <option value="">None</option>
            <option value="title">Title</option>
            <option value="date">Release Date</option>
          </select>
        </div>
        <button onClick={handleGoToLibrary} className="library-button">
          Your Library
        </button>
      </div>
      <div className="movie-list">
        {filteredMovies.map((movie) => (
          <Link to={`/movies/${movie.id}`} key={movie.id}>
            <div className="movie-card">
              <h2>{movie.title}</h2>
              {/* Add movie image */}
              <button onClick={() => handleOpenMovie(movie)}>Buy</button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );

};

export default Home;
