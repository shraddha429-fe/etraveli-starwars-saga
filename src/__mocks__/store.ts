import { configureStore } from '@reduxjs/toolkit';
import { HomePageReducer } from '../Reducers/HomePageSlice';
import { HomeInitialStateType } from '../types/movieTypes';

// Create a mock store function with an optional initial state parameter
export const createMockStore = (initialState: HomeInitialStateType = {
  sortId: '',
  movieId: null,
  searchKey: '',
  movie: null,
  isMovieListLoading: false,
  isMovieListError: null,
  movieList: [],
}) => {
  return configureStore({
    reducer: {
      homePage: HomePageReducer,
    },
    preloadedState: {
      homePage: initialState,
    },
  });
};
