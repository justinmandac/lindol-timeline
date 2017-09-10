import React from 'react';
import BottomControls from './bottom-controls';
import sinon from 'sinon';
import { expect } from 'chai'; 
import { shallow } from 'enzyme';

describe('<BottomControls />', () => {
  it('should have the -expanded class when the expanded prop is true',
  () => {
    const wrapper = shallow(<BottomControls expanded={true} />);
    expect(wrapper.is('.-expanded')).to.be.true;
  });
  
  it('shouldn\'t have the -expanded class when the expanded prop is true',
  () => {
    const wrapper = shallow(<BottomControls expanded={false} />);
    expect(wrapper.is('.-expanded')).to.be.false;
  });
});
