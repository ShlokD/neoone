import { Observable } from 'rxjs';
import {
  GET_MOVIE_BY_ID,
  GET_MOVIE_BY_ID_SUCCESS
} from './constants';
import { fetchData } from '../utils/fetchUtils';


export const getMovieById = id => ({
  type: GET_MOVIE_BY_ID,
  id
});

export const getMovieByIdSuccess = payload => ({
  type: GET_MOVIE_BY_ID_SUCCESS,
  payload
});

export const getMovieEpic = action$ => action$.ofType(GET_MOVIE_BY_ID)
  .mergeMap(({id}) => Observable.from(fetchData(`http://www.omdbapi.com?i=${id}`)))
  .map(payload => getMovieByIdSuccess(payload));


export default getMovieEpic;
