import { SEARCH_MOVIES_SUCCESS } from '../actions/constants';
import genericReducer from './genericReducer';

export const addMovieToState = (state, { payload }) => ({
  ...state,
  data: payload
});

export const movieReducerMap = {
  [SEARCH_MOVIES_SUCCESS]: addMovieToState
};

export const movies = (state = {}, action) => genericReducer(movieReducerMap, state, action);


export default movies;
