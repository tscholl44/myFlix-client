import "./movie-view.scss";

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
      <div>
        <img src={movie?.image || "https://via.placeholder.com/150"} alt={movie?.title || "Placeholder"} />
      </div>
      <div>
        <span>Title: </span>
        <span>{movie?.title || "N/A"}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie?.director || "N/A"}</span>
      </div>
      <button 
        onClick={onBackClick} 
        className="back-button"
        style={{ cursor: "pointer" }}
      >
        Back
      </button>
    </div>
  );
};