export interface Movie {
    id: number,
    episode: string,
    title: string,
    rating: number,
    releaseYear: string,
}

export interface MovieTileProps {
    movie: Film,
    colDef: (keyof Film) [],
    handleClick: (id: number) => void,
    selectedMovieId: number | null,
}

export interface HomeInitialStateType {
    sortId: string,
    movieId: number | null,
    searchKey: string,
    movie: Film | null,
    isMovieListLoading: boolean| null,
    isMovieListError: string | null,
    movieList: OriginalFilm[] | [],
}

export interface OriginalFilm {
    title: string;
    episode_id: number;
    opening_crawl: string;
    director: string;
    producer: string;
    release_date: string;
    characters: string[];
    planets: string[];
    starships: string[];
    vehicles: string[];
    species: string[];
    created: string;
    edited: string;
    url: string;
}

export interface Film extends OriginalFilm {
    episode: string;
  }