import React, { Component, PropTypes } from 'react';
import map from 'lodash/map';
import Infinite from 'react-infinite';
import './movieListComponent.scss';

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
          elementHeight={150}
          useWindowAsScrollContainer
          infiniteLoadBeginEdgeOffset={200}
          onInfiniteLoad={this._handleInfiniteLoad}>
          {map(movies, (movie, key) => <div key={key} className="movieItem">{movie.Title}</div>)}
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
  onFind: () => {},
  searchText: ''
};

export default MoviesList;
