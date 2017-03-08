import React, {
  Component
} from 'react';
import { connect } from 'react-redux';
import get from 'lodash/get';
import { actions } from '../actions';
import HeaderComponent from '../components/headerComponent';
import SearchMovieComponent from '../components/searchMovieComponent';
import '../styles/global.scss';

class App extends Component {
  render() {
    return (
      <div>
        <HeaderComponent />
        <SearchMovieComponent {...this.props} />;
      </div>
    );
  }
}

export const mapStateToProps = (state) => {
  const props = {
    movie: get(state, 'movies.data', {})
  };
  return props;
};

export const mapDispatchToProps = dispatch => ({
  onFindClick: searchText => dispatch(actions.searchMovies(searchText))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
