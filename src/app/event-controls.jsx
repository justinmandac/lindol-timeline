/**
 * @fileoverview Component definition for EventControls.
 * This component handles user input used to filter the events being displayed
 * in the map.
*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Slider from 'material-ui/slider';

const sliderStyles = {
  marginTop: '0px',
  marginBottom: '0px',
};

class EventControls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
    };
  }

  handleOnChange = (evt, val) => {    
    this.props.onChange(evt, val*100);
    this.setState({
      value: val,
    });
  }

  render() {    
    const { value } = this.state;

    return (<div className="event-details__controls">     
      <Slider
        value={value}
        className="event-slider"
        sliderStyle={sliderStyles}
        onChange={this.handleOnChange}
      />
    </div>);
  }
}


EventControls.defaultProps = {
  onChange: () => {},
  value: 0,
};

EventControls.propTypes = {
  onChange: PropTypes.func,
};

export default EventControls;
