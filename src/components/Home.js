import React, { useState, useEffect } from 'react';
import './Home.css';
import { Link } from 'react-router-dom';



function Home (props) {
  const [allMovies, setAllMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [sortBy, setSortBy] = useState('none');
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
      <h1>Movie Library</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search Movies"
          value={searchText}
          onChange={handleSearch}
        />
      </div>
      <div className="sort-bar">
        <select value={sortBy} onChange={handleSortChange}>
          <option value="none">Sort By</option>
          <option value="title">Title</option>
          <option value="date">Release Date</option>
        </select>
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
      <button onClick={handleGoToLibrary}>Go to Library</button>
    </div>
  );

};

export default Home;
