import React, { Components } from 'react';
import PropTypes from 'prop-types';

const EventDetails = (props) => <div className="event-details__wrapper">
    <div className="event-details__title">
        { props.title }
    </div>
    <div className="event-details__time">
        { props.time ? (new Date(props.time)).toString() : '' }
    </div>
</div> 

EventDetails.propTypes = {
    title: PropTypes.string,
    date: PropTypes.number
};
export default EventDetails;