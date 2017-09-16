import React, { Component } from 'react';

import BottomControls from './bottom-controls/bottom-controls';
import Header from './header/header';
import Map from './map/map';

export default class App extends Component{
  constructor() {
    super();
    this.state = {
      headerVisible: true,
      bottomControlsExpanded: false,
      startDate: null,
      endDate: null,
      focusedInput: null,
    };
  }

  /** 
   * Handles clicks on the <BottomControls />'s expand trigger to toggle the
   * said component's visibility.
   */
  handleBottomTriggerClick() {
    this.setState(
      (prevState, props) => Object.assign(prevState, {
         bottomControlsExpanded: !prevState.bottomControlsExpanded }));
  }

  onDatesChange = ({ startDate, endDate }) => 
    this.setState({ startDate, endDate })
  onFocusChange = (focusedInput) => this.setState({ focusedInput })

  render() {
    const {
      headerVisible,
      bottomControlsExpanded,
      startDate,
      endDate,
      focusedInput,
    } = this.state;
    return (
      <div className="app">
        <Header visible={headerVisible} />
        <Map />
        <BottomControls 
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          focusedInput={focusedInput}
          onDatesChange={this.onDatesChange}
          onFocusChange={this.onFocusChange}
          expanded={bottomControlsExpanded}
          onClick={this.handleBottomTriggerClick.bind(this)}
        />
      </div>
    );
  }
};