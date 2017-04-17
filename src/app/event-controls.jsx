import React, { Component } from 'react';

const EventControls = (props) => <div className="event-details__controls" onChange={props.onChange}>
    <input type="radio" id="timeSelector-7d" name="timeSelection" value="7" /> 7 Days Ago
    <input type="radio" id="timeSelector-30d" name="timeSelection" value="30" /> 30 Days Ago

    <input type="range" min="0" max="100" step="1" />
</div>

export default EventControls;