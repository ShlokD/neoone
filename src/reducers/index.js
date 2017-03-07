import { combineReducers } from 'redux';
import { movies } from './movies';

const reducers = {
  movies
};

const combined = combineReducers(reducers);
export default combined;
