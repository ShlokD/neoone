import { Observable } from 'rxjs';
import {
  SEARCH_MOVIES,
  SEARCH_MOVIES_SUCCESS
} from './constants';
import { fetchData } from '../utils/fetchUtils';

export const searchMoviesSuccess = payload => ({
  type: SEARCH_MOVIES_SUCCESS,
  payload
});

export const searchMovies = () => ({
  type: SEARCH_MOVIES
});


export const searchMoviesEpic = action$ =>
  action$.ofType(SEARCH_MOVIES)
  .mergeMap(() => Observable.from(fetchData('http://www.omdbapi.com')))
  .map(payload => searchMoviesSuccess(payload));
