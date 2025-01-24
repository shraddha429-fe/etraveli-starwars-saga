import { configureStore } from "@reduxjs/toolkit";
import {HomePageReducer} from '../Reducers/HomePageSlice';

export const store = configureStore({
    reducer : {
        homePage: HomePageReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch 