import React from 'react';
import styles from './app.css';
import map from "lodash/map";

class AppComponent extends React.Component {

  render() {
    const { onFindClick, movie } = this.props;
    return (
      <div>
        <button onClick={onFindClick}> Click Me! </button>
        <p>{movie.Title}</p>
        <img height={50} width={50} src={movie.Poster} />
      </div>

    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
