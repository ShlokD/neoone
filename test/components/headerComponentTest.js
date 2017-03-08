import React from 'react';
import { shallow } from 'enzyme';
import HeaderComponent from '../../src/components/headerComponent';

describe('HeaderComponent', () => {
  let component;
  beforeEach(() => {
    component = shallow(<HeaderComponent />);
  });
  it('should render a section', () => {
    expect(component.find('Section')).to.have.length(1);
  });

  it('should apply classname', () => {
    expect(component.find('.moviesHeader')).to.have.length(1);
  });

  it('should render text', () => {
    expect(component.contains('Search for a Movie')).to.equal(true);
  });
});
