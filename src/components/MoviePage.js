import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "./Navbar";
import { useAuth } from "../hooks/useAuth";
import CustomFlashMessage from "./CustomFlashMessage";
import "./MoviePage.css";
function MoviePage() {
  const [movie, setMovie] = useState();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();

  const [succeededToFetchMovie, setSucceededToFetchMovie] = useState(false);
  const [failedToFetchMovie, setFailedToFetchMovie] = useState(false);
  const [requestMessage, setRequestMessage] = useState("");
  // const [movieTitle, setMovieTitle] = useState("");

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(
          "/movie/view?movie_id=" + searchParams.get("movie_id"),
          {
            headers: {
              Authorization: `Bearer ${user.data.token}`,
            },

            method: "GET",
            mode: "cors",
          }
        );

        const data = await response.json();

        console.log(data);

        if (data.hasOwnProperty("err")) {
          setFailedToFetchMovie(true);

          setSucceededToFetchMovie(false);
          setRequestMessage(data["err"]);
          setTimeout(() => {
            setFailedToFetchMovie(false);
          }, 3000);
        } else {
          setFailedToFetchMovie(false);
          setSucceededToFetchMovie(true);
          setRequestMessage(data["msg"]);
          setTimeout(() => {
            setSucceededToFetchMovie(false);
          }, 3000);
        }

        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie:", error);
      }
    };

    fetchMovie();
  }, []);

  return (
    <div className="movie-page-home-container">
      <Navbar customMessage="Enjoy the movie!" searchBarActive={false} />

      <div className="movie-card">
        {succeededToFetchMovie ? (
          <CustomFlashMessage
            message={requestMessage}
            customClassName="flash-message success"
          />
        ) : null}
        {failedToFetchMovie ? (
          <CustomFlashMessage
            message={requestMessage}
            customClassName="flash-message danger"
          />
        ) : null}

        {movie ? (
          <div>
            <h2 title="movie title">{movie.title} </h2>
            <br></br>
            <div className="video_container" title="video file :)">
              {" "}
              <br></br>
              <h3>The movie is playing right now... :)</h3>
              <br></br>
            </div>
          </div>
        ) : (
          <div>
            <h2> </h2>
          </div>
        )}
        <br></br>
      </div>
    </div>
  );
}

export default MoviePage;
