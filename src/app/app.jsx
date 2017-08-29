import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import EqDrawer from './drawer.component';
import Map from './map';
import getEvents from './api';
import {PH_CENTER_LONG, PH_CENTER_LAT, DEFAULT_RADIUS} from './constants';

class App extends Component {
  constructor() {
    super();
    this.title = 'PH Earthquakes';
    this.state = {
      geojson: {},
      isSmallWidth: false,
      isDrawerOpen: true,
    };
  }

  /**
   * Sets the necessary view changes when the viewport resizes.
   * Needed to set flags that will be passed down to child components
   * who will then respond to the viewport-dependent flags. 
   */
  handleDocumentResize() {
    const viewState = {
      isSmallWidth: false,
      isDrawerOpen: true,
    };
    
    if (window.innerWidth <= 720) {
      viewState.isSmallWidth = true;
      viewState.isDrawerOpen = false;
    }
    console.log('document resized');
    this.setState((prevState, props) => Object.assign(prevState, viewState));
  }

  componentDidMount() {
    const then = new Date();

    // Set initial state of the view on load.
    this.handleDocumentResize();
    window.addEventListener('resize', () => this.handleDocumentResize());

    then.setDate(then.getDate() - 7);

    this.retrieveDate({
      start: then,
      end: new Date(),
    });
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
        
        if (window.innerWidth <= 720) {
          // On smaller device widths, hide the sidebar once
          // the selected date range has changed.
          newState.isDrawerOpen = false;
        }

        return Object.assign({}, prevState, newState);
      });
    });
  }

  render() {
    return (
      <div>
        <AppBar
          title={this.title}
          onLeftIconButtonTouchTap={this.handleMenuClick.bind(this)}
          className="app-bar"
        />
        <div className="app-map">
          <Map geojson={this.state.geojson}/>
          <EqDrawer
            title={this.title}
            open={this.state.isDrawerOpen}
            handleDateChange={this.retrieveDate.bind(this)}
          />
        </div>
      </div>
    );
  }
}

export default App;
