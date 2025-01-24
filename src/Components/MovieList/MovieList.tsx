import MovieTile from "../MovieTile/MovieTile";

const MovieList = (props) => {
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