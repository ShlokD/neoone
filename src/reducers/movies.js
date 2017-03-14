import get from 'lodash/get';
import concat from 'lodash/concat';

import { SEARCH_MOVIES_SUCCESS } from '../actions/constants';
import genericReducer from './genericReducer';

export const addMovieToState = (state, { payload, searchText }) => {
  const existingMovies = get(state, 'data', []);
  return {
    ...state,
    data: concat(existingMovies, get(payload, 'Search', [])),
    searchText
  };
};

export const movieReducerMap = {
  [SEARCH_MOVIES_SUCCESS]: addMovieToState
};

export const movies = (state = {}, action) => genericReducer(movieReducerMap, state, action);


export default movies;
