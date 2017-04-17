import React from 'react';
import PropTypes from 'prop-types';

const EventControls = props => <div className="event-details__controls" onChange={props.onChange}>
  <input type="range" id="filterInput" min="0" max="100" step="1" />
  <label htmlFor="filterInput">{props.value} Days ago</label><br />
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
