import { useParams } from 'react-router-dom';


function Movie() {
    const { movieId } = useParams();
  
    // Use movieId to fetch movie details or display the specific movie
    // ...
  
    return (
      <div>
        Movie details for ID: {movieId}
      </div>
    );
  }

  
export default Movie;