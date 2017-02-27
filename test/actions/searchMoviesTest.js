import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import { createEpicMiddleware } from 'redux-observable';
import { searchMoviesSuccess, searchMovies, searchMoviesEpic } from "../../src/actions/searchMovies";
import { SEARCH_MOVIES, SEARCH_MOVIES_SUCCESS, SEARCH_MOVIES_ERROR } from "../../src/actions/constants";

const epicMiddleware = createEpicMiddleware(searchMoviesEpic);
const mockStore = configureMockStore([epicMiddleware]);

describe('searchMoviesEpic', () => {
  let store;

  beforeEach(() => {
    store = mockStore();
  });

  afterEach(() => {
    nock.cleanAll();
    epicMiddleware.replaceEpic(searchMoviesEpic);
  });

  it('produces the movies model', () => {
    const payload = {
      Title: "Some title"
    };

    nock('http://www.omdbapi.com?t=batman')
      .get('http://www.omdbapi.com?t=batman')
      .reply(200, {
        body: {
          payload
        }
      });
    
    store.dispatch({ type: SEARCH_MOVIES }).then(
      () => {
        expect(store.getActions()).toEqual([
          { type: SEARCH_MOVIES },
          { type: SEARCH_MOVIES, payload }
      ]);
    });
  });
});
