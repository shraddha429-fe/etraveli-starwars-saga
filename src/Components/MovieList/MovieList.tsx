import MovieTile from "../MovieTile/MovieTile";
import { Film } from "../../types/movieTypes";

interface Props {
    movieList: Film[];
    colDef: (keyof Film)[];
    handleClick: (id: number) => void;
    selectedMovieId: number | null;
}

const MovieList = (props: Props) => {
  const { movieList, colDef, handleClick, selectedMovieId} = props;

    return (
        <div>
            {movieList?.map(item => {
                return (
                    <MovieTile movie={item} colDef={colDef} handleClick={handleClick} selectedMovieId={selectedMovieId}/>
                )
            })}
        </div>
    )
};

export default MovieList;