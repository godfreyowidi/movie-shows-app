import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import MovieApi from  "../../Common/Api/MovieApi";
import { APIKey } from "../../Common/Api/MovieApiKey";

export const fetchAsyncMovies = createAsyncThunk('movies/fetchAsyncMovies', async (term) => {
  const response = await MovieApi.get(
    `?apiKey=${APIKey}&s=${term}&type=movie`);
  return response.data;
});

export const fetchAsyncShows = createAsyncThunk('movies/fetchAsyncShows', async (term) => {
  const response = await MovieApi.get(
    `?apiKey=${APIKey}&s=${term}&type=series`);
  return response.data;
});

export const fetchAsyncMovieOrShowDetail = createAsyncThunk('movies/fetchAsyncMovieOrShowDetail', async (id) => {
  const response = await MovieApi.get(
    `?apiKey=${APIKey}&i=${id}&Plot=full`);
  return response.data;
});


const initialState = {
  movies: {},
  shows: {},
  selectedMovieOrShow: {}
};

const movieslice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    removeSelectedMovieOrShow: (state) => {
      state.selectedMovieOrShow = {};
    },
  },
  extraReducers: {
    [fetchAsyncMovies.pending]: () => {
      console.log("Pending")
    },
    [fetchAsyncMovies.fulfilled]: (state, { payload }) => {
      console.log("Fetched Successfully");
      return { ...state, movies: payload };
    },
    [fetchAsyncMovies.rejected]: () => {
      console.log("Rejected");
    },
    [fetchAsyncShows.fulfilled]: (state, { payload }) => {
      console.log("Fetched Successfully");
      return { ...state, shows: payload };
    },
    [fetchAsyncMovieOrShowDetail.fulfilled]: (state, { payload }) => {
      console.log("Fetched Successfully");
      return { ...state, selectedMovieOrShow: payload };
    },
  },
});

export const { removeSelectedMovieOrShow } = movieslice.actions;
export const getAllMovies = (state) => state.movies.movies;
export const getAllShows = (state) => state.movies.shows;
export const getSelectedMovieOrShow = (state) => state.movies.selectedMovieOrShow;
export default movieslice.reducer;