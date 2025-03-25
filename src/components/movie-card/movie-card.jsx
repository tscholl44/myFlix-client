import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

export const MovieCard = ({ movie, user, setUser }) => {
  const navigate = useNavigate();
  
  // Check if the movie is already a favorite
  const isFavorite = user?.FavoriteMovies?.includes(movie._id);

  const handleFavorite = () => {
    const method = isFavorite ? "DELETE" : "POST";

    fetch(`https://toms-flix-a1bb67bc1c05.herokuapp.com/users/${user.name}/movies/${movie._id}`, {
      method,
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then(res => res.json())
    .then(updatedUser => {
      if (updatedUser) {
        setUser(updatedUser); // Update user state to reflect new favorite status
      }
    })
    .catch(error => console.error("Error updating favorites:", error));
  };

  return (
    <Card className="h-100 shadow-sm">
      <Card.Img variant="top" src={movie.ImagePath} alt={movie.title} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.description.substring(0, 100)}...</Card.Text>
        <Button variant="primary" onClick={() => navigate(`/movies/${movie._id}`)}>
          View Details
        </Button>
        <Button 
          variant={isFavorite ? "danger" : "success"} 
          onClick={handleFavorite} 
          className="ms-2"
        >
          {isFavorite ? "Unfavorite" : "Favorite"}
        </Button>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    genre: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired
    }),
    director: PropTypes.shape({
      name: PropTypes.string.isRequired,
      bio: PropTypes.string
    }),
    actors: PropTypes.string
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};