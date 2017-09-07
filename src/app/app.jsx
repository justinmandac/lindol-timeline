import React, { Component } from 'react';

import BottomControls from './bottom-controls/bottom-controls';
import Header from './header/header';
import Map from './map/map';

export default class App extends Component{
  constructor() {
    super();
  }

  render() {
    return (
      <div className="app">
        <Header />
        <Map />
        <BottomControls />
      </div>
    );
  }
};