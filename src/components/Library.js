import { useAuth } from "../hooks/useAuth";
import { useEffect, useState } from "react";
import MovieList from "./MovieList";
import Navbar from "./Navbar";

function Library(props) {
  const { user } = useAuth();
  const [movieCollection, setMovieCollection] = useState([]);

  useEffect(() => {
    const getMovieCollection = async () => {
      const moviesRequest = await fetch("/movie/collection", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${user.data.token}`,
        },
        method: "GET",
        mode: "cors",
      });

      if (!moviesRequest.ok) {
        console.log("error");
      }

      const moviesData = await moviesRequest.json();
      setMovieCollection(moviesData);
    };

    getMovieCollection();
  }, []);

  return (
    <div className="home-container">
      <Navbar />
      <div className="movie-list">
        <MovieList movies={movieCollection} />
      </div>
    </div>
  );
}

export default Library;
