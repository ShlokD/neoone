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
      onFind,
      movies,
      searchText
    } = this.props;

    return (
      <div className="app-container">
        <div className="movie-search-section">
          <HeaderComponent />
          <SearchMovieComponent {...{ onFind }} />
        </div>
        <div className="movie-list-section">
          <MoviesList {...{movies, searchText, onFind}} />
        </div>
      </div>
    );
  }
}

export const mapStateToProps = (state) => {
  const props = {
    movies: get(state, 'movies.data', []),
    searchText: get(state, 'movies.searchText', '')
  };
  return props;
};

export const mapDispatchToProps = dispatch => ({
  onFind: (searchText, pageNumber) => dispatch(actions.searchMovies(searchText, pageNumber))
});

App.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object),
  searchText: PropTypes.string,
  onFind: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
