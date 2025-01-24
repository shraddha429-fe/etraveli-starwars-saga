import {useState, useEffect} from 'react';
import MovieTile from "../MovieTile/MovieTile";
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchMovies } from '../../Reducers/HomePageSlice';

const colDef = ["episode", "title", "releaseDate"];

const movies = [
    {
        id: 1,
      episode: 'Episode 1',
      title: 'The Phantom Menace',
      rating: '★★★☆☆',
      releaseDate: '1999-05-19',
      details: {
        director: 'Rick McCallum',
        averageRating: '★★★☆☆',
        description: 'War! The Republic is crumbling under attacks by the ruthless Sith Lord...',
        imdb: '76%',
        rottenTomatoes: '79%',
        metacritic: '68%',
        poster: 'https://via.placeholder.com/300x450'
      }
    },
    {
        id: 2,
      episode: 'Episode 2',
      title: 'Attack of the Clones',
      rating: '★★★☆☆',
      releaseDate: '2002-05-16',
      details: {
        director: 'Rick McCallum',
        averageRating: '★★★☆☆',
        description: 'The galaxy faces a new threat as the Clone Wars erupt...',
        imdb: '66%',
        rottenTomatoes: '65%',
        metacritic: '60%',
        poster: 'https://via.placeholder.com/300x450'
      }
    },
    {
        id: 3,
      episode: 'Episode 3',
      title: 'Revenge of the Sith',
      rating: '★★★★☆',
      releaseDate: '2005-05-19',
      details: {
        director: 'Rick McCallum',
        averageRating: '★★★★☆',
        description: 'The Republic is crumbling under attacks by the ruthless Sith Lord, Count Dooku...',
        imdb: '76%',
        rottenTomatoes: '79%',
        metacritic: '68%',
        poster: 'https://via.placeholder.com/300x450'
      }
    },
    {
        id: 4,
      episode: 'Episode 4',
      title: 'A New Hope',
      rating: '★★★★★',
      releaseDate: '1977-05-25',
      details: {
        director: 'George Lucas',
        averageRating: '★★★★★',
        description: 'A young farm boy joins a rebellion against the evil Empire...',
        imdb: '93%',
        rottenTomatoes: '92%',
        metacritic: '90%',
        poster: 'https://via.placeholder.com/300x450'
      }
    },
    {
        id: 5,
      episode: 'Episode 5',
      title: 'The Empire Strikes Back',
      rating: '★★★★★',
      releaseDate: '1980-05-17',
      details: {
        director: 'George Lucas',
        averageRating: '★★★★★',
        description: 'The Rebels face defeat as the Empire strikes back...',
        imdb: '94%',
        rottenTomatoes: '94%',
        metacritic: '91%',
        poster: 'https://via.placeholder.com/300x450'
      }
    },
    {
        id: 6,
      episode: 'Episode 6',
      title: 'Return of the Jedi',
      rating: '★★★★☆',
      releaseDate: '1983-05-25',
      details: {
        director: 'George Lucas',
        averageRating: '★★★★☆',
        description: 'The final battle against the Empire begins...',
        imdb: '82%',
        rottenTomatoes: '80%',
        metacritic: '78%',
        poster: 'https://via.placeholder.com/300x450'
      }
    }
  ];

const MovieList = () => {
    const [selectedMovie, setSlectedMovie] = useState();
    const dispatch = useAppDispatch();
    const { movieList } = useAppSelector((state)=> state.homePage); 
    useEffect(()=>{
        dispatch(fetchMovies());
    },[]);

    useEffect(()=>{console.log(">> Movie: ", movieList)},[movieList]);
    const handleClick = (id: number) => {
        setSlectedMovie(id);
    }
    return (
        <div>
            {movies.map(item => {
                return (
                    <MovieTile movie={item} colDef={colDef} handleClick={handleClick} selectedMovie={selectedMovie}/>
                )
            })}
        </div>
    )
};

export default MovieList;