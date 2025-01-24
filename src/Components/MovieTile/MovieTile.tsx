import { SyntheticEvent } from 'react';
import { MovieTileProps } from '../../types/movieTypes';
import './MovieTile.css';

const MovieTile = (props: MovieTileProps) => {
    const {movie, colDef, handleClick, selectedMovieId } = props;
    const handleMovieClick = (e: SyntheticEvent) => {
        const { id} = e.target;
        handleClick(Number(id));
    }
    return (
        <div className={`movie-container ${selectedMovieId === movie.episode_id ? 'selected' : ''}`}>
            {colDef.map((key, index) => (
                <div
                    key={`${movie.episode_id}-${index}`}
                    id={String(movie.episode_id)}
                    onClick={handleMovieClick}
                >{movie[key]}</div>
            ))}
        </div>
    )
};

export default MovieTile;