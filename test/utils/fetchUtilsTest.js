import fetchMock from 'fetch-mock';
import { fetchData } from '../../src/utils/fetchUtils';

describe('fetchUtils', () => {
  describe('fetchData', () => {
    let payload;

    beforeEach(() => {
      payload = {
        'foo': 'bar'
      };
      fetchMock.mock('http://www.someapi.com/api', payload);
    });

    it('should correctly fetch data', () => {
      return fetchData('http://www.someapi.com/api').then(response => expect(response).to.eql(payload));
    });
  });
});
