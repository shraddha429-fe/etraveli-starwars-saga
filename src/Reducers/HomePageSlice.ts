import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
// import type { PayloadAction } from '@reduxjs/toolkit'
import { HomeInitialStateType, Movie } from "../types/movieTypes";
import axios from "axios";

const initialState : HomeInitialStateType = {
        sortId: null,
        movieId: null,
        searchKey: null,
        movie: null,
        isMovieListLoading: false,
        isMovieListError: null,
        movieList: [],
};

export const fetchMovies = createAsyncThunk(
    'data/fetchData', async() => {
        try {
            const response = await axios.get("https://swapi.dev/api/films/?format=json");
            return response.data;
        }catch(error) {
            return error;
        }
    }
)

const homePageSlice = createSlice({
  name: "homePageSlice",
  initialState,
  reducers: {
    setSortId : (state, action: PayloadAction<number>) => {
        state.sortId = action.payload
    },
    setSelectedMovieId : (state, action : PayloadAction<number>) => {
        state.movieId = action.payload
    },
    setSearchKey : (state, action: PayloadAction<string>) => {
        state.searchKey = action.payload
    },
    setSelectedMovie : (state, action: PayloadAction<Movie>) => {
        state.movie = action.payload
    }
  },
  extraReducers: (builder) =>{
    builder.addCase(fetchMovies.pending, (state,) => {
        state.isMovieListLoading = true;
    });
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
        state.isMovieListLoading = false;
        state.isMovieListError = null;
        state.movieList = action.payload;
    });
    builder.addCase(fetchMovies.rejected, (state) => {
        state.isMovieListLoading = false;
        state.isMovieListError = "Something went wrong";
        state.movieList = [];
    })
  }
});

export const {setSortId,setSelectedMovieId, setSearchKey, setSelectedMovie } = homePageSlice.actions;

export const HomePageReducer = homePageSlice.reducer;

