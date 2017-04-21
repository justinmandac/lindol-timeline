import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GoogleMapsLoader from 'google-maps';
import debounce from 'debounce';

import EventDetails from './event-details.jsx';
import EventControls from './event-controls.jsx';
import initGetCircle, { dailyComparator } from './init-get-circle.js';
import Paper from 'material-ui/Paper';
import EarthquakeAppHeader from './app-header.jsx';

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
      filter: 0 // filter value in days
    };
  }

  componentDidMount() {
    // Load Google Maps
    GoogleMapsLoader.load((google) => {
      const el = this.mapContainer;
      const map = new google.maps.Map(el, {
        disableDefaultUI: true,
        zoom: 5,
        center: {
          lat: this.state.lat,
          lng: this.state.lng,
        },
        mapTypeId: 'terrain',
      }); /* eslint no-new: "off" */

      // initialize map data points style
      map.data.addListener('click', debounce(
        (e) => {
          console.log(e);
          e.ya.preventDefault();
          this.setState({
            selectedEvent: e.feature.f,
          });
        }, 200));


      this.setState({
        google,
        map,
      });
    });
  }

  setData(data) {
    this.setState({
      data,
    });
  }

  handleOnChange = (evt, value) => {    
    this.setState({
      filter: parseInt(value, 10),
      selectedEvent: {}
    })

  }

  render() {
    const { data, map, selectedEvent, filter } = this.state;
    const isMapReady = map !== null;
    const paperStyle = {
      maxWidth: '300px',
      margin: '0 auto',
      height: '100%',
      padding: '8px'
    };
    if (isMapReady) {
      map.data.setStyle(initGetCircle(google.maps.SymbolPath.CIRCLE, dailyComparator(filter)));
      map.data.addGeoJson(data);
    }

    return (<div className="app">      
      <EarthquakeAppHeader value={filter}></EarthquakeAppHeader>
      <div
        id="map"
        ref={(mapContainer) => { this.mapContainer = mapContainer; }}
        className="mapContainer"
      />
      <div className="event-details">
            <Paper style={paperStyle}>
              <div className="container">
                <EventControls onChange={this.handleOnChange} value={filter}/>
                <EventDetails title={selectedEvent.title} time={selectedEvent.time} />  
              </div>              
            </Paper>        

      </div>
    </div>);
  }
}

App.propTypes = {
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
};

export default App;
