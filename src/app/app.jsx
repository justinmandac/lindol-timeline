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
      startDate: '',
      endDate: '',
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

  render() {
    const { headerVisible, bottomControlsExpanded } = this.state;
    return (
      <div className="app">
        <Header visible={headerVisible} />
        <Map />
        <BottomControls 
          expanded={bottomControlsExpanded}
          onClick={this.handleBottomTriggerClick.bind(this)}
        />
      </div>
    );
  }
};