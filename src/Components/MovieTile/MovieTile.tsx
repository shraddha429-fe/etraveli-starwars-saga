import { SyntheticEvent } from 'react';
import './MovieTile.css';

interface Episode {
    id: number,
    episode: string,
    title: string,
    rating: number,
    releaseYear: string,
}

interface Props {
    movie: Episode,
    colDef: (keyof Episode) [],
    handleClick: (id: number) => void,
    selectedMovie: number,
}

const MovieTile = (props: Props) => {
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