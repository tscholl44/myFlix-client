import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(storedUser);
  const [token, setToken] = useState(storedToken);

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch("https://toms-flix-a1bb67bc1c05.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }
        return response.json();
      })
      .then((data) => {
        const moviesFromApi = data.map((movie) => ({
          id: movie._id.toString(),
          _id: movie._id,
          title: movie.title,
          description: movie.description,
          genre: {
            name: movie.genre.name,
            description: movie.genre.description,
          },
          director: {
            name: movie.director.name,
            bio: movie.director.bio,
          },
        }));
        setMovies(moviesFromApi);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }, [token]);

  const handleFavoriteUpdate = (movieId, action) => {
    fetch(`https://toms-flix-a1bb67bc1c05.herokuapp.com/users/${user.name}/favoriteMovies/${movieId}`, {
        method: action === 'add' ? 'POST' : 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to update favorite movies');
        }
        return fetch(`https://toms-flix-a1bb67bc1c05.herokuapp.com/users/${user.name}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    })
    .then(response => response.json())
    .then(updatedUserData => {
        setUser(updatedUserData); // Update the user state with the new favoriteMovies list
    })
    .catch(error => console.error('Error updating favorite movies:', error));
  };

  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
        }}
      />
      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <SignupView />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <LoginView onLoggedIn={(user) => setUser(user)} />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <Col md={8}>
                    <ProfileView
                      user={user}
                      token={token}
                      movies={movies}
                      setUser={setUser}
                      handleFavoriteUpdate={handleFavoriteUpdate}
                    />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <Col md={8}>
                    <MovieView movies={movies} />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <>
                    {movies.map((movie) => (
                      <Col className="mb-4" key={movie._id} md={3}>
                        <MovieCard
                          movie={movie}
                          user={user}
                          setUser={setUser}
                          handleFavoriteUpdate={handleFavoriteUpdate} // Pass the function here
                        />
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};

