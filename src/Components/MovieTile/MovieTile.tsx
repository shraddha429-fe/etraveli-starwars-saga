import { SyntheticEvent } from 'react';
import { MovieTileProps } from '../../types/movieTypes';
import './MovieTile.css';

const MovieTile = (props: MovieTileProps) => {
    const {movie, colDef, handleClick, selectedMovie } = props;
    const handleMovieClick = (e: SyntheticEvent) => {
        const { id} = e.target;
        handleClick(Number(id));
    }
    return (
        <div className={`movie-container ${selectedMovie === movie.id ? 'selected' : ''}`}>
            {colDef.map((key, index) => (
                <div
                    key={`${movie.id}-${index}`}
                    id={String(movie.id)}
                    onClick={handleMovieClick}
                >{movie[key]}</div>
            ))}
        </div>
    )
};

export default MovieTile;