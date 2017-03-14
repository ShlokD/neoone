import { Observable } from 'rxjs';
import {
  SEARCH_MOVIES,
  SEARCH_MOVIES_SUCCESS
} from './constants';
import { fetchData } from '../utils/fetchUtils';

export const searchMoviesSuccess = (payload, searchText) => ({
  type: SEARCH_MOVIES_SUCCESS,
  payload,
  searchText
});

export const searchMovies = (text, pageNumber) => ({
  type: SEARCH_MOVIES,
  text,
  pageNumber
});

export const searchMoviesEpic = (action$) => {
  let searchText = '';
  return action$.ofType(SEARCH_MOVIES)
  .mergeMap(({text, pageNumber}) => {
    searchText = text;
    return Observable.from(fetchData(`http://www.omdbapi.com?s=${text}&page=${pageNumber}`));
  })
  .map(payload => searchMoviesSuccess(payload, searchText));
};
