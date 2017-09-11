import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

const DateDisplay = ({ start, end }) => (
  <div className="date-display">
    <div className="controls">
      <span className="start">{start}</span>-
      <span className="end">{end}</span>
    </div>
  </div>
);

describe('<DateDisplay />', () => {
  it('should have the correct class', () => {
    const wrapper = shallow(<DateDisplay />);

    expect(wrapper.is('.date-display')).to.be.true;
  });

  // it('should display the start and end dates', () => {
  //   const wrapper = shallow(<DateDisplay start="2017-08-21" end="2017-08-27"/>);

  // });
})

