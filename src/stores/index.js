import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { rootEpic } from '../actions';
import reducers from '../reducers';


function reduxStore(initialState) {
  const epicMiddleware = createEpicMiddleware(rootEpic);
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(reducers, initialState, composeEnhancers(
    applyMiddleware(epicMiddleware)
  ));

  return store;
}

export default reduxStore;
