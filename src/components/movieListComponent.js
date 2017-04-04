import React, { Component, PropTypes } from 'react';
import map from 'lodash/map';
import noop from 'lodash/noop';
import Infinite from 'react-infinite';
import MovieTile from './movieTileComponent';
import './movieListComponent.scss';

export const generateMovieTile = (movie, key) => {
  const { Title, Poster } = movie;
  return (
    <div key={key}>
      <MovieTile
        title={Title}
        poster={Poster}
      />
    </div>
  );
};


class MoviesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNumber: 2
    };
    this._handleInfiniteLoad = this._handleInfiniteLoad.bind(this);
  }

  _handleInfiniteLoad() {
    const { onFind, searchText } = this.props;
    onFind(searchText, this.state.pageNumber);
    this.setState({
      pageNumber: this.state.pageNumber + 1
    });
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
          {map(movies, (movie, key) => generateMovieTile(movie, key))}
        </Infinite>
      </div>
    );
  }
}

MoviesList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object),
  onFind: PropTypes.func,
  searchText: PropTypes.string
};

MoviesList.defaultProps = {
  movies: [],
  onFind: noop,
  searchText: ''
};

export default MoviesList;
