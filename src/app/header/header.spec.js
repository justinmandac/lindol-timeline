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

  it('should be visible when the visible prop is set to true', () => {
    const wrapper = shallow(<Header visible={true} />);
    expect(wrapper.is('.-visible')).to.be.true;
  });

  it('should not be visible when the visible prop is set to false', () => {
    const wrapper = shallow(<Header visible={false} />);
    expect(wrapper.is('.-visible')).to.be.false;
  });
});