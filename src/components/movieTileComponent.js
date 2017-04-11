import React, { Component, PropTypes } from 'react';
import noop from 'lodash/noop';
import { FRONT_FACE, BACK_FACE } from '../actions/constants';
import './movieTileComponent.scss';


class MovieTile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibility: FRONT_FACE
    };
    this._onTileClick = this._onTileClick.bind(this);
  }

  _onTileClick() {
    const { id, onTileClick } = this.props;
    const newVisibility = this.state.visibility === FRONT_FACE ? BACK_FACE : FRONT_FACE;
    this.setState({
      visibility: newVisibility
    });
    onTileClick(id);
  }

  _renderMovieImage() {
    const { title, poster } = this.props;
    const { visibility } = this.state;
    const visibilityClass = visibility === FRONT_FACE ? 'visible' : 'hidden';
    return <img className={`movieImage movieImage-${visibilityClass}`} alt={`${title} poster`} src={poster} />;
  }

  _renderMovieInfo() {
    const { movieInfo } = this.props;
    const { visibility } = this.state;
    const { Title, Plot } = movieInfo;
    const visibilityClass = visibility === BACK_FACE ? 'visible' : 'hidden';
    return (
      <div className={`movieInfo movieInfo-${visibilityClass}`}>
        <div className="movieInfoTitle">{Title}</div>
        <div className="movieInfoPlot">{Plot}</div>
      </div>
    );
  }
  render() {
    return (
      <button className="movieTileButton" onClick={this._onTileClick}>
        <div className="movieTile">
          {this._renderMovieImage()}
          {this._renderMovieInfo()}
        </div>
      </button>
    );
  }
}

MovieTile.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  poster: PropTypes.string,
  movieInfo: PropTypes.shape({
    id: PropTypes.object
  }),
  onTileClick: PropTypes.func
};

MovieTile.defaultProps = {
  id: '',
  title: '',
  poster: '',
  movieInfo: {},
  onTileClick: noop
};
export default MovieTile;
