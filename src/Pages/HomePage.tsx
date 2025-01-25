import { useEffect, useState } from 'react';
import HomePageHeader from '../Components/HomePageHeader/HomePageHeader';
import MovieList from '../Components/MovieList/MovieList';
import { useAppDispatch, useAppSelector } from '../hooks';
import {
  fetchMovies,
  setSelectedMovieId,
  setSelectedMovie,
} from '../Reducers/HomePageSlice';
import useDebounce from '../hooks/useDebounce';
import './HomePage.css';
import MovieDetail from '../Components/MovieDetails/MovieDetail';
import { toRoman } from '../Utility';
import Loader from '../Shared/Components/Loader/Loader';
import { Film } from '../types/movieTypes';
import useSize from '../hooks/useSize';
import PopUp from '../Shared/Components/PopUp/PopUp';

const HomePage = () => {
  const [filteredList, setFilteredList] = useState<Film[]>([]);
  const { width } = useSize();
  const dispatch = useAppDispatch();
  const { movieList, movieId, searchKey, sortId, movie, isMovieListLoading } =
    useAppSelector((state) => state.homePage);
  useEffect(() => {
    dispatch(fetchMovies());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const searchKeyword = useDebounce(searchKey, 1000);

  useEffect(() => {
    if (movieList.length > 0) {
      let updatedList = movieList.map((item) => ({
        ...item,
        episode: `Episode ${item.episode_id}`,
        title: `Episode ${toRoman(item.episode_id)} - ${item.title}`,
      }));

      if (searchKeyword) {
        updatedList = updatedList.filter((item) =>
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
          updatedList.sort(
            (a, b) =>
              new Date(a.release_date).getTime() -
              new Date(b.release_date).getTime()
          );
          break;
        case '4':
          updatedList.sort(
            (a, b) =>
              new Date(b.release_date).getTime() -
              new Date(a.release_date).getTime()
          );
          break;
        default:
          break;
      }

      setFilteredList(updatedList);
    }
  }, [searchKeyword, movieList, sortId]);

  const handleClick = (id: number) => {
    dispatch(setSelectedMovieId(id));
    const selectedMovieArray = filteredList.filter(
      (item) => item.episode_id === id
    );
    dispatch(setSelectedMovie(selectedMovieArray[0]));
  };

  const colDef: (keyof Film)[] = ['episode', 'title', 'release_date'];

  const displayMovieDetails = () => {
    if (width > 500) {
      return movie ? (
        <div className="content-details">
          <MovieDetail movie={movie} />
        </div>
      ) : (
        <div className="default-container">
          <h3>Click on a movie to view it's details</h3>
        </div>
      );
    }
  };

  return (
    <div className="main-container">
      <div className="header">
        <HomePageHeader />
      </div>
      {isMovieListLoading ? (
        <div className="loading-container">
          <Loader color="#DF1592" size={20} />
        </div>
      ) : (
        <>
          <div className="content">
            <div className="content-list">
              <MovieList
                movieList={filteredList}
                colDef={colDef}
                selectedMovieId={movieId}
                handleClick={handleClick}
              />
            </div>
            {width > 500 && <div className="divider" />}
            {width > 500 && displayMovieDetails()}
            {width < 500 && movie && (
              <PopUp
                isOpen={true}
                onClose={() => dispatch(setSelectedMovie(null))}
                width="100%"
                height="100%"
              >
                <MovieDetail movie={movie} />
              </PopUp>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;
