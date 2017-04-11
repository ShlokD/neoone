import React, { Component, PropTypes } from 'react';
import map from 'lodash/map';
import get from 'lodash/get';
import noop from 'lodash/noop';
import isEmpty from 'lodash/isEmpty';
import Infinite from 'react-infinite';
import MovieTile from './movieTileComponent';
import './movieListComponent.scss';

class MoviesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNumber: 2
    };
    this._handleInfiniteLoad = this._handleInfiniteLoad.bind(this);
    this._generateMovieTile = this._generateMovieTile.bind(this);
  }

  _handleInfiniteLoad() {
    const { onFind, searchText } = this.props;
    onFind(searchText, this.state.pageNumber);
    this.setState({
      pageNumber: this.state.pageNumber + 1
    });
  }

  _generateMovieTile(movie, key) {
    const { Title, Poster, imdbID } = movie;
    const { getMovieDetails, movieInfo } = this.props;
    const tileMovieInfo = get(movieInfo, `${imdbID}`, {});
    const onTileClickFunc = isEmpty(tileMovieInfo) ? getMovieDetails : noop;
    return (
      <div key={key}>
        <MovieTile
          title={Title}
          poster={Poster}
          id={imdbID}
          movieInfo={tileMovieInfo}
          onTileClick={onTileClickFunc}
        />
      </div>
    );
  }

  render() {
    const { movies } = this.props;
    return (
      <div className="moviesList">
        <Infinite
          className="moviesInfiniteListContainer"
          elementHeight={160}
          useWindowAsScrollContainer
          infiniteLoadBeginEdgeOffset={200}
          onInfiniteLoad={this._handleInfiniteLoad}>
          {map(movies, (movie, key) => this._generateMovieTile(movie, key))}
        </Infinite>
      </div>
    );
  }
}

MoviesList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object),
  onFind: PropTypes.func,
  searchText: PropTypes.string,
  movieInfo: PropTypes.shape({
    id: PropTypes.object
  }),
  getMovieDetails: PropTypes.func
};

MoviesList.defaultProps = {
  movies: [],
  onFind: noop,
  searchText: '',
  movieInfo: {},
  getMovieDetails: noop
};

export default MoviesList;
