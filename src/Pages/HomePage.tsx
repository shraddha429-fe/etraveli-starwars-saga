import { useEffect, useState } from 'react';
import HomePageHeader from '../Components/HomePageHeader/HomePageHeader';
import MovieList from '../Components/MovieList/MovieList';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchMovies, setSelectedMovieId } from '../Reducers/HomePageSlice';
import useDebounce from '../hooks/useDebounce';
import './HomePage.css';

const HomePage = () => {
    const [filteredList, setFilteredList] = useState([]);
    const dispatch = useAppDispatch();
    const { movieList, movieId, searchKey, sortId } = useAppSelector((state)=> state.homePage); 
    useEffect(()=>{
        dispatch(fetchMovies());
    }, []);

    const searchKeyword = useDebounce(searchKey, 1000);

    useEffect(()=>{console.log(">> sortId: ", sortId)},[sortId]);

    useEffect(() => {
        if (movieList.length > 0) {
            const initializedList = movieList.map(item => ({
                ...item,
                episode: `Episode ${item.episode_id}`,
            }));
            setFilteredList(initializedList);
        }
    }, [movieList]);

    useEffect(() => {
        if (movieList.length > 0) {
            let updatedList = movieList.map(item => ({
                ...item,
                episode: `Episode ${item.episode_id}`,
            }));

            if (searchKeyword) {
                updatedList = updatedList.filter(item =>
                    item.title.toLowerCase().includes(searchKeyword.toLowerCase())
                );
            }

            switch (sortId) {
                case '1': // Sort by episode, asc
                    updatedList.sort((a, b) => a.episode_id - b.episode_id);
                    break;
                case '2': // Sort by episode, desc
                    updatedList.sort((a, b) => b.episode_id - a.episode_id);
                    break;
                case '3': // Sort by year, asc
                    updatedList.sort((a, b) => new Date(a.release_date).getTime() - new Date(b.release_date).getTime());
                    break;
                case '4': // Sort by year, desc
                    updatedList.sort((a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime());
                    break;
                default:
                    break;
            }

            setFilteredList(updatedList);
        }
    }, [searchKeyword, movieList, sortId]);


     const handleClick = (id: number) => {
        console.log(">> id: ", id);
        dispatch(setSelectedMovieId(id));
    }

    const colDef = ["episode", "title", "release_date"];

    return (
        <div className="main-container">
            <div className="header">
                <HomePageHeader/>
            </div>
            <div className="content">
                <div className="content-list">
                    <MovieList 
                        movieList={filteredList} 
                        colDef={colDef}
                        selectedMovieId={movieId}
                        handleClick={handleClick}
                    />
                </div>
                <div className="divider" />
                <div className="content-details">
                    <div>Content-details</div>
                </div>
            </div>
            
        </div>
    )
};


export default HomePage;