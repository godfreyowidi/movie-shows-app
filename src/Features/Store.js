import { configureStore  } from "@reduxjs/toolkit";
import moviesReducer from "./Movies/MovieSlice";

export const store = configureStore({
  reducer: {movies: moviesReducer},
});