import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(storedUser);
  const [token, setToken] = useState(storedToken);
  const [selectedGenre, setSelectedGenre] = useState(""); // State for the selected genre

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
          imagePath: movie.imagePath,
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

  // Filter movies based on the selected genre
  const filteredMovies = selectedGenre
    ? movies.filter((movie) => movie.genre.name === selectedGenre)
    : movies;

  // Extract unique genres for the dropdown
  const genres = [...new Set(movies.map((movie) => movie.genre.name))];

  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
        }}
      />
      <Container fluid>
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
                ) : filteredMovies.length === 0 ? (
                  <div className="empty-state">
                    <h3>No movies found</h3>
                    <p>Try adjusting your filter or check back later for new releases!</p>
                  </div>
                ) : (
                  <Container>
                    {/* Genre Filter */}
                    <div className="mb-4">
                      <Form.Select
                        className="mb-4"
                        value={selectedGenre}
                        onChange={(e) => setSelectedGenre(e.target.value)}
                        style={{ maxWidth: '300px' }}
                      >
                        <option value="">🎭 All Genres</option>
                        {genres.map((genre) => (
                          <option key={genre} value={genre}>
                            {genre}
                          </option>
                        ))}
                      </Form.Select>
                    </div>

                    {/* Movie Grid */}
                    <div className="movie-grid">
                      {filteredMovies.map((movie) => (
                        <MovieCard
                          key={movie._id}
                          movie={movie}
                          user={user}
                          setUser={setUser}
                          handleFavoriteUpdate={handleFavoriteUpdate}
                        />
                      ))}
                    </div>
                  </Container>
                )}
              </>
            }
          />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

