import { combineEpics } from 'redux-observable';
import { searchMovies, searchMoviesSuccess, searchMoviesEpic } from './searchMovies';

export const actions = {
  searchMovies,
  searchMoviesSuccess
};

export const rootEpic = combineEpics(
  searchMoviesEpic
);
