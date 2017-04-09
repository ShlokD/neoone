import React from 'react';
import { shallow } from 'enzyme';
import MovieTile from '../../src/components/movieTileComponent';

describe('Movie Tile Component', () => {
  let component;
  let props;

  beforeEach(() => {
    props = {
      title: 'Star Wars',
      poster: 'some-image-src'
    };
    component = shallow(<MovieTile {...props} />);
  });

  it('should render image with correct source tag', () => {
    expect(component.find('img').prop('src')).to.eql('some-image-src');
    expect(component.find('img').prop('alt')).to.eql('Star Wars poster');
  });
});
