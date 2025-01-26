import { useEffect, useState } from 'react';
import HomePageHeader from '../Components/HomePageHeader/HomePageHeader';
import { useAppDispatch, useAppSelector } from '../hooks';
import {
  fetchMovies,
  setSelectedMovieId,
  setSelectedMovie,
} from '../Reducers/HomePageSlice';
import useDebounce from '../hooks/useDebounce';
import MovieDetail from '../Components/MovieDetails/MovieDetail';
import { toRoman } from '../Utility';
import Loader from '../Shared/Components/Loader/Loader';
import { ColumnDefItem, Film } from '../types/movieTypes';
import useSize from '../hooks/useSize';
import PopUp from '../Shared/Components/PopUp/PopUp';
import Table from '../Shared/Components/Table/Table';

const HomePage = () => {
  const [filteredList, setFilteredList] = useState<Film[]>([]);
  const { width } = useSize();
  const dispatch = useAppDispatch();
  const { movieList, searchKey, sortId, movie, movieId, isMovieListLoading } =
    useAppSelector((state) => state.homePage);
  useEffect(() => {
    dispatch(fetchMovies());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const searchKeyword = useDebounce(searchKey, 1000);

  const getRowClass = (row: Film) => {
    if (row.episode_id === movieId) return 'highlighted-row';
    return '';
  };

  useEffect(() => {
    console.log('-----------------------------------', movie);
  }, [movie]);

  useEffect(() => {
    if (movieList.length > 0) {
      let updatedList = movieList.map((item) => ({
        ...item,
        episode: `Episode ${item.episode_id}`,
        title: `Episode ${toRoman(item.episode_id)} - ${item.title}`,
        id: item.episode_id,
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

  const columns: ColumnDefItem[] = [
    { key: 'episode', headerName: 'EPISODE' },
    { key: 'title', headerName: 'TITLE' },
    { key: 'release_date', headerName: 'RELEASE DATE' },
  ];

  const displayMovieDetails = () => {
    return movie ? (
      <div className="content-details">
        <MovieDetail movie={movie} />
      </div>
    ) : (
      <div className="default-container">
        <h3>Click on a movie to view it's details</h3>
      </div>
    );
  };

  return (
    <div className="main-container">
      <div className="header">
        <HomePageHeader />
      </div>
      {isMovieListLoading ? (
        <div className="loading-container">
          <Loader color="#DF1592" size={'20px'} />
        </div>
      ) : (
        <>
          <div className="content">
            <div className="content-list">
              <Table
                list={filteredList}
                colDef={columns}
                onClick={handleClick}
                getRowClass={getRowClass}
              />
            </div>
            {width > 500 && <div className="divider" />}
            {displayMovieDetails()}
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
