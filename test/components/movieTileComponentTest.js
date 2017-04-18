import React from 'react';
import { shallow } from 'enzyme';
import MovieTile from '../../src/components/movieTileComponent';
import { FRONT_FACE, BACK_FACE } from '../../src/actions/constants';

describe('Movie Tile Component', () => {
  let component;
  let props;
  let sandbox;
  let onTileClickSpy;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    onTileClickSpy = sandbox.spy();

    props = {
      id: '123',
      movieInfo: {
        Plot: 'A movie about warring stars'
      },
      title: 'Star Wars',
      poster: 'some-image-src',
      onTileClick: onTileClickSpy
    };
    component = shallow(<MovieTile {...props} />);
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should set correct initial state', () => {
    expect(component.state()).to.eql({
      visibility: FRONT_FACE
    });
  });

  it('should render image with correct source tag and classname', () => {
    expect(component.find('img').prop('src')).to.equal('some-image-src');
    expect(component.find('img').prop('alt')).to.equal('Star Wars poster');
    expect(component.find('img').prop('className')).to.equal('movieImage movieImage-visible');
  });

  it('should render movie info with correct classname', () => {
    expect(component.find('.movieInfo').prop('className')).to.include('movieInfo-hidden');
  });

  it('should render title', () => {
    expect(component.find('.movieInfoTitle')).to.have.length(1);
    expect(component.find('.movieInfoTitle').text()).to.equal('Star Wars');
  });

  it('should render plot', () => {
    expect(component.find('.movieInfoPlot')).to.have.length(1);
    expect(component.find('.movieInfoPlot').text()).to.equal('A movie about warring stars');
  });

  describe('instance methods', () => {
    let instance;
    beforeEach(() => {
      instance = component.instance();
    });

    describe('_onTileClick', () => {
      beforeEach(() => {
        instance._onTileClick();
      });

      it('should set correct state', () => {
        expect(instance.state).to.eql({
          visibility: BACK_FACE
        });
      });

      it('should call the passed onTileClick method', () => {
        expect(onTileClickSpy.callCount).to.equal(1);
        expect(onTileClickSpy.lastCall.args).to.include('123');
      });

      it('should set correct class for movie image', () => {
        const movieImage = shallow(instance._renderMovieImage());
        expect(movieImage.prop('className')).to.equal('movieImage movieImage-hidden');
      });

      it('should set correct class for movie info', () => {
        const movieInfo = shallow(instance._renderMovieInfo());
        expect(movieInfo.prop('className')).to.equal('movieInfo movieInfo-visible');
      });
    });
  });
});
