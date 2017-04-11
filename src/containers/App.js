import React, {
  Component,
  PropTypes
} from 'react';
import { connect } from 'react-redux';
import get from 'lodash/get';
import { actions } from '../actions';
import HeaderComponent from '../components/headerComponent';
import SearchMovieComponent from '../components/searchMovieComponent';
import MoviesList from '../components/movieListComponent.js';
import '../styles/global.scss';

class App extends Component {
  render() {
    const {
      movies,
      searchText,
      movieInfo,
      onFind,
      getMovieDetails
    } = this.props;

    return (
      <div className="app-container">
        <div className="movie-search-section">
          <HeaderComponent />
          <SearchMovieComponent {...{ onFind }} />
        </div>
        <div className="movie-list-section">
          <MoviesList {...{movies, searchText, movieInfo, onFind, getMovieDetails}} />
        </div>
      </div>
    );
  }
}

export const mapStateToProps = (state) => {
  const props = {
    movies: get(state, 'movies.data', []),
    searchText: get(state, 'movies.searchText', ''),
    movieInfo: get(state, 'movieInfo', {})
  };
  return props;
};

export const mapDispatchToProps = dispatch => ({
  onFind: (searchText, pageNumber) => dispatch(actions.searchMovies(searchText, pageNumber)),
  getMovieDetails: id => dispatch(actions.getMovieById(id))
});

App.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object),
  searchText: PropTypes.string,
  movieInfo: PropTypes.shape({
    id: PropTypes.object
  }),
  onFind: PropTypes.func,
  getMovieDetails: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
