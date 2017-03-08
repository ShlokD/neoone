import React from 'react';
import { shallow } from 'enzyme';
import Section from '../../src/atoms/section';

describe('Section Atom', () => {
  let component;
  let child;

  beforeEach(() => {
    component = shallow(
      <Section className="some-class">
        Foo
      </Section>);
  });

  it('should render a section tag', () => {
    expect(component.type()).to.equal('section');
  });

  it('should apply the passed class', () => {
    expect(component.prop('className')).to.equal('some-class');
  });
  it('should render children', () => {
    expect(component.contains('Foo')).to.equal(true);
  });
});
