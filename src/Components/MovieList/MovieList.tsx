import {useState} from 'react';
import MovieTile from "../MovieTile/MovieTile";

const list = [
    {
        id: 1,
        episode: "EPISODE 1",
        title: "Episode 1 - The Phantom Menace",
        rating: 5,
        releaseYear : "1999-05-19"
    },
    {
        id: 2,
        episode: "EPISODE 2",
        title: "Episode 2 - Attak of the Clones",
        rating: 4,
        releaseYear : "2002-05-16"
    },
    {
        id: 3,
        episode: "EPISODE 3",
        title: "Episode 3 - Revenge of the Sith",
        rating: 7,
        releaseYear : "2005-05-19"
    },
    {
        id: 4,
        episode: "EPISODE 4",
        title: "Episode 4 - A new Hope",
        rating: 6,
        releaseYear : "1997-11-02"
    },

];

const colDef = ["episode", "title", "releaseYear"];



const MovieList = () => {
    const [selectedMovie, setSlectedMovie] = useState();
    const handleClick = (id: number) => {
        console.log(">> id: ", id);
        setSlectedMovie(id);
    }
    return (
        <div>
            {list.map(item => {
                return (
                    <MovieTile movie={item} colDef={colDef} handleClick={handleClick} selectedMovie={selectedMovie}/>
                )
            })}
        </div>
    )
};

export default MovieList;