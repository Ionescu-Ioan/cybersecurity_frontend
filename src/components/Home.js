import React, { useState, useEffect } from "react";
//import "./Home.css";
import MovieList from "./MovieList";
import Navbar from "./Navbar";

function Home(props) {
  const [allMovies, setAllMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  //const [searchText, setSearchText] = useState("");
  const [sortBy, setSortBy] = useState("");
  const API_URL = "http://your-api-domain.com/api/movies";
  //const navigate = useNavigate();
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

  const sortMovies = (movies, sortBy) => {
    if (sortBy === "title") {
      return movies.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "date") {
      return movies.sort((a, b) => a.releaseDate - b.releaseDate);
    } else {
      return movies;
    }
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  // Handle movie purchase logic (implementation omitted for brevity)
  const handleBuyMovie = (movie) => {
    // Add movie to user's library
  };

  const handleOpenMovie = (movie) => {
    // navigate to movie details page with movie id
  };

  return (
    <div className="home-container">
      <Navbar />
      <div className="movie-list">
        <MovieList movies={allMovies} />
      </div>
    </div>
  );
}

export default Home;
