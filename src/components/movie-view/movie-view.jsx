import { useParams } from "react-router";
import { Link } from "react-router-dom";

import "./movie-view.scss";

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();

  const movie = movies.find((m) => m.id === movieId);

  if (!movie) {
    return (
      <div>
        <p>Movie not found.</p>
        <Link to={`/`}>
          <button className="back-button">Back</button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div>
        <img
          className="w-100"
          src={movie.image || "https://via.placeholder.com/300x450?text=No+Image+Available"}
          alt={movie.title}
        />
      </div>
      <div>
        <span>Title: </span>
        <span>{movie.title}</span>
      </div>
      <div>
        <span>Description: </span>
        <span>{movie.description}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie.genre.name}</span>
      </div>
      <div>
        <span>Genre Description: </span>
        <span>{movie.genre.description}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.director.name}</span>
      </div>
      <div>
        <span>Director Bio: </span>
        <span>{movie.director.bio}</span>
      </div>
      <Link to={`/`}>
        <button className="back-button">Back</button>
      </Link>
    </div>
  );
};