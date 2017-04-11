import { GET_MOVIE_BY_ID_SUCCESS } from '../actions/constants';
import genericReducer from './genericReducer';


export const addMovieInfoToState = (state = {}, { payload }) => {
  const { imdbID } = payload;
  const movieInfoObject = {
    [imdbID]: payload
  };

  return {
    ...state,
    ...movieInfoObject
  };
};

const movieInfoReducerMap = {
  [GET_MOVIE_BY_ID_SUCCESS]: addMovieInfoToState
};

export const movieInfo = (state = {}, action) => genericReducer(movieInfoReducerMap, state, action);

export default movieInfo;
