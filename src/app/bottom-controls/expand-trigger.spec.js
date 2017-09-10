import React from 'react';
import { shallow } from 'enzyme';
import chai, { expect } from 'chai';
import ExpandTrigger from './expand-trigger';
import sinon from 'sinon';

describe('<ExpandTrigger />', () => {
  it('should have the -expanded class when the expanded prop is true',
    () => {
      const wrapper = shallow(<ExpandTrigger expanded={true} />);
      expect(wrapper.is('.-expanded')).to.be.true;
  });

  it('shouldn\'t have the -expanded class when the expanded prop is true',
    () => {
      const wrapper = shallow(<ExpandTrigger expanded={false} />);
      expect(wrapper.is('.-expanded')).to.be.false;
  });

  it('should call the onClick prop when the <button> is pressed', () => {
    const onClick = sinon.spy();
    const wrapper = shallow(<ExpandTrigger onClick={onClick} />);
    wrapper.find('button').simulate('click');
    expect(onClick.callCount).to.be.equal(1);
  })
});