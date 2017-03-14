import Promise from 'bluebird';
import { ActionsObservable } from 'redux-observable';
import { searchMoviesSuccess, searchMovies, searchMoviesEpic } from '../../src/actions/searchMovies';
import { SEARCH_MOVIES_SUCCESS, SEARCH_MOVIES } from '../../src/actions/constants';
import * as fetchUtils from '../../src/utils/fetchUtils';

describe('Search Movies Actions', () => {
  let sandbox;
  let fetchStub;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    fetchStub = sandbox.stub(fetchUtils, 'fetchData');
    fetchStub.returns(new Promise((resolve, reject) => {
      resolve({'message': 'success'});
    }));
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('searchMoviesSuccess action creator', () => {
    it('should return an action with type SEARCH_MOVIES_SUCCESS', () => {
      expect(searchMoviesSuccess({'foo': 'bar'}, 'baz')).to.eql({
        type: SEARCH_MOVIES_SUCCESS,
        payload: {
          'foo': 'bar'
        },
        searchText: 'baz'
      });
    });
  });

  describe('searchMovies action creator', () => {
    it('should return an action with type SEARCH_MOVIES', () => {
      expect(searchMovies('someText', 2)).to.eql({
        type: SEARCH_MOVIES,
        text: 'someText',
        pageNumber: 2
      });
    });
  });

  describe('searchMoviesEpic', () => {
    let action$;
    beforeEach(() => {
      action$ = ActionsObservable.of({
        type: SEARCH_MOVIES
      });
    });

    it('should trigger necessary actions for success', () => {
      const expectedResult = {
        type: SEARCH_MOVIES_SUCCESS,
        payload: {
          'message': 'success'
        }
      }

      searchMoviesEpic(action$)
      .toArray()
      .subscribe(result => expect(result).to.eql(expectedResult));
    });
  });
});
