import { Observable } from "rxjs";
import {
  SEARCH_MOVIES,
  SEARCH_MOVIES_ERROR,
  SEARCH_MOVIES_SUCCESS
} from "./constants";

import config from "config";
import { fetchData } from "../utils/fetch-utils";
export const searchMoviesSuccess = (payload) => {
  return {
    type: SEARCH_MOVIES_SUCCESS,
    payload
  }
};

export const searchMoviesError = (error) => {
  return {
    type: SEARCH_MOVIES_ERROR,
    error
  }
};



export const searchMovies = () => {
  return {
    type: SEARCH_MOVIES
  }
}


export const searchMoviesEpic = (action$) => {
  return action$.ofType(SEARCH_MOVIES)
  .mergeMap(action => Observable.from(fetchData("http://www.omdbapi.com?t=batman")))
  .map((payload) => searchMoviesSuccess(payload))
  .catch((error) => searchMoviesError(error));
}
