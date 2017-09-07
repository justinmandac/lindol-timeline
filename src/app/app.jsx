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
    };
  }

  render() {
    const { headerVisible, bottomControlsExpanded } = this.state;
    return (
      <div className="app">
        <Header visible={headerVisible} />
        <Map />
        <BottomControls expanded={bottomControlsExpanded} />
      </div>
    );
  }
};