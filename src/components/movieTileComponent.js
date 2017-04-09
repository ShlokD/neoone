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
  render() {
    const { title, poster, movieInfo } = this.props;
    return (
      <button className="movieTileButton" onClick={this._onTileClick}>
        <div className="movieTile">
          <img className="movieImage" alt={`${title} poster`} src={poster} />
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
