import { MovieTileProps } from '../../types/movieTypes';
import './MovieTile.css';

const MovieTile = (props: MovieTileProps) => {
    const {movie, colDef, handleClick, selectedMovieId } = props;
    const handleMovieClick = (movieId: number) => {
        handleClick(movieId);
    }
    return (
        <div key={movie.episode_id} onClick={() => handleMovieClick(movie.episode_id)} className={`movie-container ${selectedMovieId === movie.episode_id ? 'selected' : ''}`}>
            {colDef.map((col) => (
                <div>{movie[col]}</div>
            ))}
        </div>
    )
};

export default MovieTile;