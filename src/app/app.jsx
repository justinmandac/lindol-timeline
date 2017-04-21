import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GoogleMapsLoader from 'google-maps';
import debounce from 'debounce';

import EventDetails from './event-details.jsx';
import EventControls from './event-controls.jsx';
import initGetCircle, { dailyComparator } from './init-get-circle.js';
import Paper from 'material-ui/Paper';
import EarthquakeAppHeader from './app-header.jsx';
import EarthquakeAppBottomBar from './app-bottom-bar.jsx';
import MainDrawer from 'material-ui/Drawer';
import { getDiff } from './utils/date-formatter';

GoogleMapsLoader.KEY = 'AIzaSyBkpSg1zTJoZxGqVyfaZmQ26j6W-LPlb-s';
GoogleMapsLoader.REGION = 'PH';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: props.lat,
      lng: props.lng,
      google: null,
      map: null,
      data: {},
      selectedEvent: {},
      selectedMarker: {},
      filter: 0,// filter value in days,
      sidebarOpened: false,
    };
  }

  componentDidMount() {
    const clickHandler = (e) => {
        console.log(e);
        this.setState({
          selectedEvent: e.feature.f,
          selectedMarker: e
        });
        // Center and zoom onto the clicked marker
        this.state.map.setCenter(e.latLng);
        this.state.map.setZoom(10);
    };
    const mapsCallback = (google) => {
      const {lat, lng} = this.state;
      const el = this.mapContainer;
      const map = new google.maps.Map(el, {
        disableDefaultUI: true,
        zoom: 5,
        center: {
          lat: lat,
          lng: lng,
        },
        mapTypeId: 'roadmap',
      }); /* eslint no-new: "off" */
      // initialize map data points style
      map.data.addListener('click', debounce(clickHandler, 200));
      this.setState({
        google,
        map,
      });      
    };

    // Load Google Maps
    GoogleMapsLoader.load(mapsCallback);
  }

  setData(data) {
    this.setState({
      data,
    });
  }

  handleOnChange = (evt, value) => {    
    this.setState({
      filter: parseInt(value, 10),
      selectedEvent: {},
      selectedMarker: {}
    });
  }

  handleDateChanged = (evt, date) => {
    this.setState({
      filter: getDiff(new Date(), date)
    });
  }

  handleMenuClicked = () => {
    this.setState((prevState, props) => {
      return {
        sidebarOpened: !prevState.sidebarOpened
      };
    });
  }

  render() {
    const { data, map, selectedEvent, filter, sidebarOpened } = this.state;
    const isMapReady = map !== null;

    if (isMapReady) {
      map.data.setStyle(initGetCircle(google.maps.SymbolPath.CIRCLE, 
                                     dailyComparator(filter)));
      map.data.addGeoJson(data);
    }

    return (<div className="app">      
      <EarthquakeAppHeader 
        value={filter} 
        onMenuClicked={this.handleMenuClicked}
        onDateChanged={this.handleDateChanged}
      >        
      </EarthquakeAppHeader>
      <section>
        <div
          id="map"
          ref={(mapContainer) => { this.mapContainer = mapContainer; }}
          className="mapContainer"
        />
        <EarthquakeAppBottomBar>
          <EventControls onChange={this.handleOnChange} value={filter}/>
          <EventDetails title={selectedEvent.title} />  
        </EarthquakeAppBottomBar>
      </section>
      <MainDrawer 
        open={sidebarOpened}
        docked={false}
        width={280}
        onRequestChange={(open) => this.setState({
          sidebarOpened: open
        })}>
        Menu
      </MainDrawer>
    </div>); // end of app
  }
}

App.propTypes = {
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
};

export default App;
