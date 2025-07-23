import { useParams } from "react-router";
import { Link } from "react-router";
import { Button, Container, Row, Col, Badge } from "react-bootstrap";

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();

  const movie = movies.find((m) => m._id === movieId);

  if (!movie) {
    return (
      <div className="empty-state">
        <h3>Movie not found</h3>
        <p>The movie you're looking for doesn't exist or has been removed.</p>
        <Link to="/">
          <Button variant="primary">← Back to Movies</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="movie-hero">
      <div 
        className="movie-hero-bg"
        style={{
          backgroundImage: `linear-gradient(
            to right,
            rgba(20, 20, 20, 0.95) 0%,
            rgba(20, 20, 20, 0.7) 50%,
            rgba(20, 20, 20, 0.95) 100%
          ), url(${movie.imagePath})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
          position: 'relative'
        }}
      >
        <Container className="movie-hero-content">
          <Row className="align-items-center min-vh-100">
            <Col lg={6} className="movie-details-section">
              <div className="movie-poster-mobile d-lg-none mb-4">
                <img
                  src={movie.imagePath || "https://via.placeholder.com/300x450?text=No+Image+Available"}
                  alt={movie.title}
                  className="img-fluid rounded"
                  style={{ maxHeight: '300px', objectFit: 'cover' }}
                />
              </div>
              
              <h1 className="movie-title display-3 fw-bold text-white mb-3">
                {movie.title}
              </h1>
              
              <div className="movie-meta mb-4">
                <Badge bg="danger" className="me-2 px-3 py-2 fs-6">
                  {movie.genre.name}
                </Badge>
              </div>
              
              <p className="movie-description lead text-light mb-4" style={{ maxWidth: '600px', lineHeight: '1.6' }}>
                {movie.description}
              </p>
              
              <div className="movie-info-grid mb-4">
                <div className="info-item mb-3">
                  <h5 className="text-danger mb-2">Director</h5>
                  <p className="text-light mb-1 fs-5 fw-semibold">{movie.director.name}</p>
                  <p className="text-muted small">{movie.director.bio}</p>
                </div>
                
                <div className="info-item mb-3">
                  <h5 className="text-danger mb-2">Genre</h5>
                  <p className="text-muted">{movie.genre.description}</p>
                </div>
              </div>
              
              <div className="movie-actions">
                <Link to="/">
                  <Button variant="outline-light" size="lg" className="me-3">
                    ← Back to Movies
                  </Button>
                </Link>
                <Button variant="primary" size="lg">
                  ▶ Watch Trailer
                </Button>
              </div>
            </Col>
            
            <Col lg={6} className="d-none d-lg-block">
              <div className="movie-poster-desktop text-center">
                <img
                  src={movie.imagePath || "https://via.placeholder.com/300x450?text=No+Image+Available"}
                  alt={movie.title}
                  className="img-fluid rounded shadow-lg"
                  style={{ 
                    maxHeight: '600px', 
                    objectFit: 'cover',
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8)'
                  }}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};