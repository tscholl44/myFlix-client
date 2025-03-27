import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

export const MovieCard = ({ movie, user, setUser }) => {
  const navigate = useNavigate();

  const handleAddToFavorites = () => {
    fetch(`https://toms-flix-a1bb67bc1c05.herokuapp.com/users/${user.name}/favoriteMovies/${movie.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add movie to favorites");
        }
        return response.json();
      })
      .then((updatedUser) => {
        setUser(updatedUser); // Update the user state with the updated user data
        alert(`${movie.title} has been added to your favorites!`);
      })
      .catch((error) => {
        console.error("Error adding movie to favorites:", error);
        alert("Something went wrong. Please try again.");
      });
  };

  return (
    <Card className="h-100 shadow-sm">
      <Card.Img variant="top" src={movie.ImagePath} alt={movie.title} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.description.substring(0, 100)}...</Card.Text>
        <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
          <Button variant="link">More Details</Button>
        </Link>
        <Button
          variant="primary"
          className="mt-2"
          onClick={handleAddToFavorites}
        >
          Add to Favorites
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
      description: PropTypes.string.isRequired,
    }),
    director: PropTypes.shape({
      name: PropTypes.string.isRequired,
      bio: PropTypes.string,
    }),
    actors: PropTypes.string,
  }).isRequired,
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    favoriteMovies: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  setUser: PropTypes.func.isRequired,
};