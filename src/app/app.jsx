import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GoogleMapsLoader from 'google-maps';
import debounce from 'debounce';

// Material UI Imports
import Paper from 'material-ui/Paper';
import MenuItem from 'material-ui/MenuItem';
import MainDrawer from 'material-ui/Drawer';

import EventDetails from './event-details.jsx';
import EventControls from './event-controls.jsx';
import initGetCircle, { dailyComparator } from './init-get-circle.js';
import EarthquakeAppHeader from './app-header.jsx';
import EarthquakeAppBottomBar from './app-bottom-bar.jsx';
import { getDiff, getDateAgo } from './utils/date-formatter';

GoogleMapsLoader.KEY = 'AIzaSyBkpSg1zTJoZxGqVyfaZmQ26j6W-LPlb-s';
GoogleMapsLoader.REGION = 'PH';

const generateInfoWindow = (text) => 
  `<div class="info-window">${text}</div>`

const clearMarker = (marker) => {
  if(marker !== null) {
    marker.setMap(null);
  }
}

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
      selectedMarker: null,
      filter: 0,// filter value in days,
      sidebarOpened: false,
      infoWindow: null
    };
  }

  componentDidMount() {
    const clickHandler = (e) => {
        console.log(e);
        const {
          map, 
          infoWindow, 
          google,
          selectedMarker
        } = this.state;
        const content = generateInfoWindow(e.feature.f.title);
        const marker = new google.maps.Marker({
          position: e.latLng,
          map: map
        });
        this.setState({
          selectedEvent: e.feature.f,
          selectedMarker: marker
        });
        // Center and zoom onto the clicked marker
        map.setCenter(e.latLng);
        map.setZoom(10);
        // display infoWindow but clear existing ones first
        clearMarker(selectedMarker);
        infoWindow.setContent(content);
        infoWindow.open(map, marker);

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
      let infoWindow;
      // initialize map data points style      
      infoWindow = new google.maps.InfoWindow();
      // clear the marker when the infoWindow's close button
      // is clicked
      infoWindow.addListener('closeclick', (evt) => {
        clearMarker(this.state.selectedMarker);
        this.state.map.setZoom(5);
      });
      map.data.addListener('click', debounce(clickHandler, 200));
      this.setState({
        google,
        map,
        infoWindow
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
    /*
      Clear any visible markers if the user changes the slider position 
      in order to prevent orphaned markers and infowindows when the displayed
      events changes. 
    */
    clearMarker(this.state.selectedMarker);
    this.setState({
      filter: parseInt(value, 10),
      selectedEvent: {},
      selectedMarker: null
    });
  }

  handleDateChanged = (evt, date) => {
    console.log(date);
    const {data} = this.state;
    const current = data.metadata ? 
                    data.metadata.generated :
                    (new Date()).getTime();

    this.setState((prevState, props) => {
      const filter = getDiff(new Date(current), date);
      return {
        filter,
      }
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
    const currentDate = data.metadata ? 
                        new Date(data.metadata.generated) : 
                        new Date();
    /**
     * Currently limiting the retrieved dataset from the current date to
     * the past 100 days. 
    */
    const minDate = getDateAgo(100);

    if (isMapReady) {
      map.data.setStyle(initGetCircle(google.maps.SymbolPath.CIRCLE, 
                                     dailyComparator(filter)));
      map.data.addGeoJson(data);
    }

    return (<div className="app">
      <EarthquakeAppHeader 
        value={filter} 
        currentDate={currentDate}
        minDate={minDate}
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
        </EarthquakeAppBottomBar>
      </section>
      <MainDrawer 
        open={sidebarOpened}
        docked={false}
        width={280}
        onRequestChange={(open) => this.setState({
          sidebarOpened: open
        })}>
      </MainDrawer>
    </div>); // end of app
  }
}

App.propTypes = {
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
};

export default App;
