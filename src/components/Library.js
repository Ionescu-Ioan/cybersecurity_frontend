import { useAuth } from "../hooks/useAuth";
import { useEffect, useState } from "react";
import MovieList from "./MovieList";
import Navbar from "./Navbar";

function Library() {
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
      console.log(moviesData);
      setMovieCollection(moviesData);
    };

    getMovieCollection();
  }, []);

  const loadSearchedMoviesFromLibrary = (movieArray) => {
    setMovieCollection(movieArray);
  };

  return (
    <div className="home-container">
      <Navbar
        customMessage="Your Library"
        searchBarActive={true}
        loadSearchedMoviesHandler={loadSearchedMoviesFromLibrary}
        inLibrary={true}
      />
      {movieCollection.length === 0 ? (
        <div>You don't have any movies yet. Go buy some!</div>
      ) : (
        <MovieList movies={movieCollection} ownedMovie={true} />
      )}
    </div>
  );
}

export default Library;
