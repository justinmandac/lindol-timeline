/**
 * @fileoverview Component definition for EventControls.
 * This component handles user input used to filter the events being displayed
 * in the map.
*/
import React from 'react';
import PropTypes from 'prop-types';

const getDaysAgo = (days) => {
  const then = new Date();

  then.setDate((new Date()).getDate() - days);

  return then.toString().split(' ').slice(0, 4).join(' ');
};

const EventControls = props => <div className="event-details__controls" onChange={props.onChange}>
  <input
    autoFocus
    defaultValue="0"
    type="range"
    id="filterInput"
    min="0"
    max="100"
    step="1"
  /> <br />

  <label htmlFor="filterInput">{props.value} Day(s) ago. {getDaysAgo(props.value)}</label>
</div>;

EventControls.defaultProps = {
  onChange: () => {},
  value: 0,
};

EventControls.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.number,
};

export default EventControls;
