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
import Toggle from 'material-ui/Toggle';

const sliderStyles = {
  marginTop: '0px',
  marginBottom: '0px',
};

const subHeaderStyles = {
  padding: 0,
  lineHeight: '18px'
};

/* eslint react/prefer-stateless-function : "off"  */
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
    const { value, onSeeAllToggle } = this.props;
    return (<div className="event-details__controls">
      <Subheader style={subHeaderStyles}>Filter</Subheader>
      <Slider
        value={value/100}
        className="event-slider"
        sliderStyle={sliderStyles}
        onChange={this.handleOnChange}
      />
      <div className="event-details__toggles">
         <Subheader style={subHeaderStyles}>Toggles</Subheader>
        <Toggle
          label="Show All"
          onToggle={onSeeAllToggle}
        />         
      </div>
    </div>);
  }
}


EventControls.defaultProps = {
  onChange: () => {},
  onSeeAllToggle: () => {},
  value: 0,
};

EventControls.propTypes = {
  onChange: PropTypes.func,
  onSeeAllToggle: PropTypes.func,
  value: PropTypes.number
};

export default EventControls;
