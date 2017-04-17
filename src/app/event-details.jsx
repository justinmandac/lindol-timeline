import React from 'react';
import PropTypes from 'prop-types';

const EventDetails = props => <div className="event-details__wrapper">
  <div className="event-details__title">
    { props.title }
  </div>
  <div className="event-details__time">
    { props.time ?
     (new Date(props.time)).toString().split('(').shift() :
     ''}
  </div>
</div>;

EventDetails.defaultProps = {
  title: 'Click on a marker for more information.',
  time: 0,
};

EventDetails.propTypes = {
  title: PropTypes.string,
  time: PropTypes.number,
};
export default EventDetails;
