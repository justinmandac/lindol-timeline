import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import EqDrawer from './drawer.component';
import Map from './map';
import getEvents from './api';
import {PH_CENTER_LONG, PH_CENTER_LAT, DEFAULT_RADIUS} from './constants';

class App extends Component {
  constructor() {
    super();
    this.state = {
      geojson: {},
    };
  }
  retrieveDate({start, end}) {
    console.log('Date clicked', start, end);
    getEvents(PH_CENTER_LAT, PH_CENTER_LONG, DEFAULT_RADIUS, start, end)
    .then((geojson) => {
      this.setState((prevState, props) => {
        const newState = { geojson };
        return Object.assign({}, prevState, newState);
      });
    });
  }
  render() {    
    return (
      <div>
        <AppBar />
        <Map geojson={this.state.geojson}/>
        <EqDrawer handleDateClick={this.retrieveDate.bind(this)}/>
      </div>
    );
  }
}

export default App;
