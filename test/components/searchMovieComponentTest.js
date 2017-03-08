import React from 'react';
import { shallow } from 'enzyme';
import SearchMovieComponent from '../../src/components/searchMovieComponent';

describe('SearchMovieComponent', () => {
  let props;
  let sandbox;
  let component;
  let instance;
  let onFindClickStub;
  let onChangeStub;
  let onSubmitStub;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    onFindClickStub = sandbox.stub();
    props = {
      onFindClick: onFindClickStub
    };
    component = shallow(<SearchMovieComponent {...props} />);
    instance = component.instance();
    onChangeStub = sandbox.spy(instance, '_onChange');
    onSubmitStub = sandbox.spy(instance, '_onSubmit');
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('render', () => {
    it('should set initial state', () => {
      expect(component.state()).to.eql({
        text: ''
      });
    });

    it('should render a container div', () => {
      expect(component.find('.searchMovieContainer')).to.have.length(1);
    });

    it('should render a label', () => {
      expect(component.find('.searchMovieLabel')).to.have.length(1);
      expect(component.find('.searchMovieLabel').type()).to.equal('label');
      expect(component.find('.searchMovieLabel').text()).to.equal(' Search ');
    });

    it('should render a form', () => {
      expect(component.find('.searchMovieForm')).to.have.length(1);
      expect(component.find('.searchMovieForm').type()).to.equal('form');
    });

    it('should render an input', () => {
      expect(component.find('.searchMovieInput')).to.have.length(1);
      expect(component.find('.searchMovieInput').type()).to.equal('input');
    });

    it('should render an span', () => {
      expect(component.find('.searchMovieText')).to.have.length(1);
      expect(component.find('.searchMovieText').type()).to.equal('span');
      expect(component.find('.searchMovieText').text()).to.equal(' Enter a movie name ');
    });

    it('should call onChange when text is entered', () => {
      component.find('.searchMovieInput').simulate('keydown', { which: 'a'});
      expect(onChangeStub).to.be.calledOnce;
    });

    it('should call onSubmit when text is submitted', () => {
      component.find('.searchMovieForm').simulate('submit', { preventDefault: () => {}});
      expect(onSubmitStub).to.be.calledOnce;
    });
  });

  describe('instance methods', () => {
    describe('_onChange', () => {
      it('should set the correct state', () => {
        instance._onChange({
          target: {
            value: 'game of thrones'
          }
        });
        expect(component.state()).to.eql({
          text: 'game of thrones'
        });
      });
    });

    describe('_onSubmit', () => {
      it('should call the passed onFindClick method', () => {
        instance._onSubmit({
          preventDefault: () => {},
        });
        expect(onFindClickStub).to.be.calledOnce;
      });
    });
  });
});
