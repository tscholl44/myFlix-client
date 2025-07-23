import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router";

export const MovieCard = ({ movie, user, handleFavoriteUpdate }) => {
  const isFavorite = user.favoriteMovies.includes(movie._id);

  const toggleFavorite = () => {
    const action = isFavorite ? "remove" : "add";
    console.log(`toggleFavorite called for movieId: ${movie._id}, action: ${action}`);
    handleFavoriteUpdate(movie._id, action);

    // Update localStorage directly
    user.favoriteMovies = action === "add"
      ? [...user.favoriteMovies, movie._id]
      : user.favoriteMovies.filter((id) => id !== movie._id);

    localStorage.setItem("user", JSON.stringify(user));
  };

  return (
    <Card className="h-100 fade-in">
      <div style={{ position: 'relative' }}>
        <Card.Img variant="top" src={movie.imagePath} alt={movie.title} />
        <div className="card-overlay"></div>
      </div>
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.description.substring(0, 100)}...</Card.Text>
        <div className="d-flex flex-column gap-2">
          <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
            <Button variant="link" className="w-100 text-start p-0">
              ▶ More Info
            </Button>
          </Link>
          <Button
            variant={isFavorite ? 'danger' : 'outline-light'}
            size="sm"
            onClick={toggleFavorite}
            className="d-flex align-items-center justify-content-center gap-2"
          >
            <span>{isFavorite ? '❤️' : '🤍'}</span>
            {isFavorite ? 'Remove from List' : 'Add to My List'}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
  }).isRequired,
  user: PropTypes.shape({
    favoriteMovies: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  handleFavoriteUpdate: PropTypes.func.isRequired,
};