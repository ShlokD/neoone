import React, { Component, PropTypes } from 'react';

class SearchMovieComponent extends Component {

  render() {
    const { onFindClick, movie } = this.props;
    return (
      <div>
        <button onClick={onFindClick}> Click Me! </button>
        <p>{movie.Title}</p>
      </div>
    );
  }
}

SearchMovieComponent.propTypes = {
  movie: PropTypes.arrayOf(PropTypes.object),
  onFindClick: PropTypes.func
};

SearchMovieComponent.defaultProps = {
  movie: [],
  onFindClick: () => {}
};

export default SearchMovieComponent;
