import { combineEpics } from 'redux-observable';
import { searchMovies, searchMoviesSuccess, searchMoviesEpic } from './searchMovies';
import { getMovieById, getMovieEpic } from './getMovie';

export const actions = {
  searchMovies,
  searchMoviesSuccess,
  getMovieById
};

export const rootEpic = combineEpics(
  searchMoviesEpic,
  getMovieEpic
);
