import React from 'react';
import { shallow } from 'enzyme';
import noop from 'lodash/noop';
import MoviesList from '../../src/components/movieListComponent';

describe('MoviesList', () => {
  let component;
  let sandbox;
  let instance;
  let props;
  let onFindSpy;
  let handleInfiniteLoadStub;
  let getMovieDetailsSpy;

  describe('render', () => {
    beforeEach(() => {
      sandbox = sinon.sandbox.create();
      onFindSpy = sandbox.spy();
      getMovieDetailsSpy = sandbox.spy();
      props = {
        movies: [{
          imdbID: '123',
          Title: 'Star Wars',
          Poster: 'some-link'
        },
        {
          imdbID: '1234',
          Title: 'Star Trek',
          Poster: 'some-zelda'
        }],
        searchText: 'abc',
        onFind: onFindSpy,
        movieInfo: {
          123: {
            plot: 'A movie about warring stars'
          }
        },
        getMovieDetails: getMovieDetailsSpy
      };

      component = shallow(<MoviesList {...props} />);
      instance = component.instance();
      handleInfiniteLoadSpy = sandbox.spy(instance, '_handleInfiniteLoad');
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('should set the correct initial state', () => {
      expect(component.state()).to.eql({
        pageNumber: 2
      });
    });

    it('should render an infinite', () => {
      expect(component.find('Infinite')).to.have.length(1);
    });

    it('should render two movie tiles', () => {
      expect(component.find('MovieTile')).to.have.length(2);
    });

    it('should call the handleInfiniteLoad method on infinite load', () => {
      component.find('Infinite').simulate('onInfiniteLoad');
      expect(handleInfiniteLoadStub).to.be.calledOnce;
    });

    describe('instance methods', () => {

      describe('_handleInfiniteLoad', () => {
        beforeEach(() => {
          instance._handleInfiniteLoad();
        });

        it('should call passed onFind callback', () => {
          expect(onFindSpy).to.be.calledOnce;
        });

        it('should set the correct state', () => {
          expect(component.state()).to.eql({
            pageNumber: 3
          });
        });
      });

      describe('generateMovieTile', () => {
        let movieTile;
        let tileComponent;

        it('should generate a movie tile', () => {
          tileComponent = shallow(instance._generateMovieTile({
            Title: 'Star Wars',
            Poster: 'some-link',
            imdbID: '123'
          }, 'some-key'));

          movieTile = tileComponent.find('MovieTile');
          expect(tileComponent.key()).to.equal('some-key');
          expect(movieTile).to.have.length(1);
          expect(movieTile.prop('title')).to.equal('Star Wars');
          expect(movieTile.prop('poster')).to.equal('some-link');
          expect(movieTile.prop('id')).to.equal('123');
          expect(movieTile.prop('movieInfo')).to.eql({
            plot: 'A movie about warring stars'
          });
          expect(movieTile.prop('onTileClick')).to.equal(noop);
        });

        it('should set the onTileClick method to getMovieDetails if movieInfo is empty', () => {
          props.movieInfo = {};
          component = shallow(<MoviesList {...props} />);
          instance = component.instance();
          tileComponent = shallow(instance._generateMovieTile({
            Title: 'Star Wars',
            Poster: 'some-link',
            imdbID: '123'
          }, 'some-key'));
          movieTile = tileComponent.find('MovieTile');
          expect(movieTile.prop('movieInfo')).to.eql({});
          expect(movieTile.prop('onTileClick')).to.equal(getMovieDetailsSpy);
        });
      });
    });
  });
});
