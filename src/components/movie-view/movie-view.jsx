import { useParams } from "react-router";
import { Link } from "react-router";

import "./movie-view.scss";

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();

  const movie = movies.find((m) => m._id === movieId);

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
        <span className="movie-title"> Title: </span>
        <span>{movie.title}</span>
      </div>
      <div>
        <span className="movie-description">Description: </span>
        <span>{movie.description}</span>
      </div>
      <div className="movie-details"></div>
        <div>
          <span className="detail">Genre: </span>
          <span>{movie.genre.name}</span>
        </div>
        <div>
          <span className="detail">Genre Description: </span>
          <span>{movie.genre.description}</span>
        </div>
        <div>
          <span className="detail">Director: </span>
          <span>{movie.director.name}</span>
        </div>
        <div>
          <span className="detail">Director Bio: </span>
          <span>{movie.director.bio}</span>
        </div>
      <Link to={`/`}>
        <button className="back-button">Back</button>
      </Link>
    </div>
  );
};