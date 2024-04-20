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
          Authorization: `Bearer ${user.data.token}`,
        },
        method: "GET",
        mode: "cors",
      });

      if (!moviesRequest.ok) {
        console.log("error");
      }

      const moviesData = await moviesRequest.json();
      console.log(moviesRequest);
      setMovieCollection(moviesData);
    };

    getMovieCollection();
  }, []);

  const loadSearchedMovies = (movieArray) => {
    setMovieCollection(movieArray);
  };
  return (
    <div className="home-container">
      <Navbar
        customMessage="Your Library"
        searchBarActive={true}
        loadSearchedMoviesHandler={loadSearchedMovies}
      />
      <MovieList movies={movieCollection} ownedMovie={true} />
    </div>
  );
}

export default Library;
