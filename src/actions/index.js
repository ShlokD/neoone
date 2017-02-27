import { combineEpics } from "redux-observable";
import { searchMovies, searchMoviesSuccess, searchMoviesError, searchMoviesEpic } from "./searchMovies";

export const actions = {
  searchMovies,
  searchMoviesSuccess,
  searchMoviesError
};

export const rootEpic = combineEpics(
  searchMoviesEpic
);
