import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GoogleMapsLoader from 'google-maps';
import debounce from 'debounce';
import EventDetails from './event-details.jsx';
import EventControls from './event-controls.jsx';
import initGetCircle, { defaultComparator } from './init-get-circle.js';

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

  handleOnChange = (evt) => {
    this.setState({
      filter: evt.target.value
    })

  }

  render() {
    const { data, map, selectedEvent, filter } = this.state;

    if (map !== null) {
      map.data.setStyle(initGetCircle(google.maps.SymbolPath.CIRCLE, defaultComparator(filter)));
      map.data.addGeoJson(data);
    }

    return (<div className="app">
      <div
        id="map"
        ref={(mapContainer) => { this.mapContainer = mapContainer; }}
        className="mapContainer"
      />
      <div className="event-details container">
        <EventDetails title={selectedEvent.title} time={selectedEvent.time} />
        <EventControls onChange={this.handleOnChange} />
      </div>
    </div>);
  }
}

App.propTypes = {
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
};

export default App;
