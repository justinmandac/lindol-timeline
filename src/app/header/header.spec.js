import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Header from './header';

describe('<Header />', () => {
  it('should have the base classes', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.find('.header')).to.be.equal(1);
  });
});