import { createStore, applyMiddleware, compose } from "redux";
import { createEpicMiddleware } from "redux-observable";
import { browserHistory } from "react-router";
import { routerMiddleware } from "react-router-redux";
import createLogger from "redux-logger";
import { rootEpic } from "../actions";
import reducers from '../reducers';

const logger = createLogger();
const router = routerMiddleware(browserHistory);

function reduxStore(initialState) {
  const epicMiddleware = createEpicMiddleware(rootEpic);
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(reducers, initialState, composeEnhancers(
    applyMiddleware(epicMiddleware)
  ));

  return store;
}

export default reduxStore;
