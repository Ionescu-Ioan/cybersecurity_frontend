import { useAuth } from "../hooks/useAuth";
import { useEffect, useState } from "react";

function Library(props) {
  const { user } = useAuth();
  const [movies, setMovies] = useState([]);
  const getMovieCollection = async () => {
    const moviesRequest = await fetch("/movie/collection", {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${user.loginData.token}`,
      },
      method: "GET",
      mode: "cors",
    });

    if (!moviesRequest.ok) {
      throw new Error("Invalid token!");
      console.log("error");
    }

    const moviesData = await moviesRequest.json();
    setMovies(moviesData);
  };

  useEffect(() => {
    const getMovieCollection = async () => {
      const moviesRequest = await fetch("/movie/collection", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${user.loginData.token}`,
        },
        method: "GET",
        mode: "cors",
      });

      if (!moviesRequest.ok) {
        console.log("error");
      }

      const moviesData = await moviesRequest.json();
      setMovies(moviesData);
    };

    getMovieCollection();
  }, []);

  return (
    <div>
      <div>{user.loginData.user}</div>
      <div>{movies}</div>
    </div>
  );
}

export default Library;
