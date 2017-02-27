import React, {
  Component,
  PropTypes
} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions } from '../actions';
import get from "lodash/get";
import Main from '../components/App';

class App extends Component {
  render() {
    return <Main {...this.props} />;
  }
}
App.propTypes = {
  actions: PropTypes.shape({})
};

export const mapStateToProps = (state) => {
  const props = {
    movie: get(state, "movies.data", {})
  };
  return props;
}

export const mapDispatchToProps = (dispatch) => {
  return {
    onFindClick: () => {
      dispatch(actions.searchMovies())
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
