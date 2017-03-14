import movies from '../../src/reducers/movies';
import { SEARCH_MOVIES_SUCCESS  } from '../../src/actions/constants';


describe('Movies reducer', () => {
  let action;
  it('should return passed state by default', () => {
    const returnedState = movies({}, { type: 'SOME_ACTION' });
    expect(returnedState).to.eql({});
  });

  it('should return correct state on SEARCH_MOVIES_SUCCESS action', () => {
    action = {
      type: SEARCH_MOVIES_SUCCESS,
      payload: {
        Search: [
          { Title: 'Star Wars' },
          { Title: 'Star Wars 2'},
          { Title: 'Star Wars 3'}
        ],
      },
      searchText: 'Star Wars'
    };
    const returnedState = movies({}, action);
    expect(returnedState).to.eql({
      data:[
        { Title: 'Star Wars' },
        { Title: 'Star Wars 2'},
        { Title: 'Star Wars 3'}
      ],
      searchText: 'Star Wars'
    });
  });
});
