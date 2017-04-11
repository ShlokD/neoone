import { combineReducers } from 'redux';
import { movies } from './movies';
import { movieInfo } from './movieInfo';

const reducers = {
  movies,
  movieInfo
};

const combined = combineReducers(reducers);
export default combined;
