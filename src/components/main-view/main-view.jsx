import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "Inception",
      image:
        "https://m.media-amazon.com/images/I/912AErFSBHL._AC_UF894,1000_QL80_.jpg",
      director: "Christopher Nolan",
    },
    {
      id: 2,
      title: "Shawshank Redemption",
      image:
        "https://m.media-amazon.com/images/M/MV5BMDAyY2FhYjctNDc5OS00MDNlLThiMGUtY2UxYWVkNGY2ZjljXkEyXkFqcGc@._V1_.jpg",
      director: "Frank Darabont",
    },
    {
      id: 3,
      title: "Apocalypto",
      image:
        "https://m.media-amazon.com/images/M/MV5BMzJkNzI3ZmEtZmRhOS00YTM1LWI3OTAtZmVjZmNkODIxNmFmXkEyXkFqcGc@._V1_.jpg",
      director: "Mel Gibson",
    },
    {
      id: 4,
      title: "Platoon",
      image:
        "https://m.media-amazon.com/images/I/61juOMdMMIL._AC_UF894,1000_QL80_.jpg",
      director: "Oliver Stone",
    },
    {
      id: 5,
      title: "Shrek",
      image:
        "https://images-na.ssl-images-amazon.com/images/I/41MBLi5a4jL._SX384_BO1,204,203,200_.jpg",
      director: "Andrew Adamson",
    },
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};
