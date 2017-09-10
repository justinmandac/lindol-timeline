import React, {Component} from 'react';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { shallow } from 'enzyme';
import Header from './header';

chai.use(chaiEnzyme());

describe('<Header />', () => {
  it('should have the base classes', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.is('.header.app-header')).to.be.true;
  });
});