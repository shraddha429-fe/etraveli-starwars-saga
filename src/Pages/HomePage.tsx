import { useEffect, useState } from 'react';
import HomePageHeader from '../Components/HomePageHeader/HomePageHeader';
import MovieList from '../Components/MovieList/MovieList';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchMovies, setSelectedMovieId, setSelectedMovie } from '../Reducers/HomePageSlice';
import useDebounce from '../hooks/useDebounce';
import './HomePage.css';
import MovieDetail from '../Components/MovieDetails/MovieDetail';
import { toRoman } from '../Utility';
import Loader from '../Shared/Components/Loader/Loader';

const HomePage = () => {
    const [filteredList, setFilteredList] = useState([]);
    const dispatch = useAppDispatch();
    const { movieList, movieId, searchKey, sortId, movie, isMovieListLoading } = useAppSelector((state)=> state.homePage); 
    useEffect(()=>{
        dispatch(fetchMovies());
    }, []);

    const searchKeyword = useDebounce(searchKey, 1000);

    useEffect(() => {
        if (movieList.length > 0) {
            let updatedList = movieList.map(item => ({
                ...item,
                episode: `Episode ${item.episode_id}`,
                title: `Episode ${toRoman(item.episode_id)} - ${item.title}`,
            }));

            if (searchKeyword) {
                updatedList = updatedList.filter(item =>
                    item.title.toLowerCase().includes(searchKeyword.toLowerCase())
                );
            }

            switch (sortId) {
                case '1':
                    updatedList.sort((a, b) => a.episode_id - b.episode_id);
                    break;
                case '2':
                    updatedList.sort((a, b) => b.episode_id - a.episode_id);
                    break;
                case '3':
                    updatedList.sort((a, b) => new Date(a.release_date).getTime() - new Date(b.release_date).getTime());
                    break;
                case '4':
                    updatedList.sort((a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime());
                    break;
                default:
                    break;
            }

            setFilteredList(updatedList);
        }
    }, [searchKeyword, movieList, sortId]);

    useEffect(()=>{
        dispatch(setSelectedMovie(filteredList.filter(item => item.episode_id === movieId) ));
    },[movieId]);


     const handleClick = (id: number) => {
        dispatch(setSelectedMovieId(id));
    }

    const colDef = ["episode", "title", "release_date"];

    return (
        <div className="main-container">
            <div className="header">
                <HomePageHeader/>
            </div>
            {isMovieListLoading ? 
                <div  className="loading-container"><Loader color={"#DF1592"} size={20}/></div> :
                ( <div className="content">
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
                        <MovieDetail movie={movie} />
                    </div>
                </div>)
                }
           
            
        </div>
    )
};


export default HomePage;