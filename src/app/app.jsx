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
      isSmallWidth: false,
      isDrawerOpen: true,
    };
  }

  componentDidMount() {
    if (window.innerWidth <= 720) {
      this.setState((prevState, props) => {
        return Object.assign(prevState, {
          isSmallWidth: true,
          isDrawerOpen: false,
        })
      });
    }
  }

  handleMenuClick() {
    this.setState((prevState, props) => {
      return Object.assign(prevState, {
        isDrawerOpen: !prevState.isDrawerOpen,
      })
    });
  }

  retrieveDate({start, end}) {
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
        <AppBar onLeftIconButtonTouchTap={this.handleMenuClick.bind(this)}
                className="app-bar"
        />
        <div className="app-map">
          <Map geojson={this.state.geojson}/>
          <EqDrawer open={this.state.isDrawerOpen}
                    handleDateClick={this.retrieveDate.bind(this)}
          />
        </div>
      </div>
    );
  }
}

export default App;
