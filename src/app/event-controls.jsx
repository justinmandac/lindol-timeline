/**
 * @fileoverview Component definition for EventControls.
 * This component handles user input used to filter the events being displayed
 * in the map.
*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Slider from 'material-ui/slider';
import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';

const sliderStyles = {
  marginTop: '0px',
  marginBottom: '0px',
};

const subHeaderStyles = {
  padding: 0,
  lineHeight: '18px'
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
    const { value } = this.props;
    return (<div className="event-details__controls">
      <Subheader style={subHeaderStyles}>Filter</Subheader> 
      <Slider
        value={value/100}
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
  value: PropTypes.number
};

export default EventControls;
