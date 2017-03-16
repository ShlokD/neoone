import React, { Component, PropTypes } from 'react';
import './movieTileComponent.scss';


class MovieTile extends Component {
  render() {
    const { title, poster } = this.props;
    return (
      <div className="movieTile">
        <h4 className="movieTitle">{title}</h4>
        <img className="movieImage" alt={`${title} poster`} src={poster} />
      </div>
    );
  }
}

MovieTile.propTypes = {
  title: PropTypes.string,
  poster: PropTypes.string
};

MovieTile.defaultProps = {
  title: '',
  poster: ''
};
export default MovieTile;
