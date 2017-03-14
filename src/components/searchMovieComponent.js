import React, { Component, PropTypes } from 'react';
import './searchMovieComponent.scss';

class SearchMovieComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    };
    this._onChange = this._onChange.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
  }

  _onChange(e) {
    this.setState({
      text: e.target.value
    });
  }

  _onSubmit(e) {
    e.preventDefault();
    const { onFind } = this.props;
    const { text } = this.state;
    onFind(text, 1);
  }


  render() {
    const { text } = this.state;
    return (
      <div className="searchMovieContainer">
        <label className="searchMovieLabel" htmlFor="movieTitleSearch"> Search </label>
        <form className="searchMovieForm" onSubmit={this._onSubmit} autoComplete="off">
          <input
            type="text"
            name="movieTitleSearch"
            className="searchMovieInput"
            value={text}
            onChange={this._onChange}/>
        </form>
        <span className="searchMovieText"> Enter a movie name </span>
      </div>
    );
  }
}

SearchMovieComponent.propTypes = {
  onFind: PropTypes.func
};

export default SearchMovieComponent;
