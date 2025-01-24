export interface Movie {
    id: number,
    episode: string,
    title: string,
    rating: number,
    releaseYear: string,
}

export interface MovieTileProps {
    movie: Movie,
    colDef: (keyof Movie) [],
    handleClick: (id: number) => void,
    selectedMovie: number,
}

export interface HomeInitialStateType {
    sortId: number | null,
    movieId: number | null,
    searchKey: string | null,
    movie: Movie | null,
    isMovieListLoading: boolean| null,
    isMovieListError: string | null,
    movieList: [],
}