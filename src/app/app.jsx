import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GoogleMapsLoader from 'google-maps';

GoogleMapsLoader.KEY = 'AIzaSyBkpSg1zTJoZxGqVyfaZmQ26j6W-LPlb-s';
GoogleMapsLoader.REGION = 'PH';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      debug: false,
      lat: props.lat,
      lng: props.lng,
    };
  }

  componentDidMount() {
    GoogleMapsLoader.load((google) => {
      const el = this.mapContainer;
      new google.maps.Map(el, {
        zoom: 5,
        center: {
          lat: this.state.lat,
          lng: this.state.lng,
        },
        mapTypeId: 'terrain',
      }); /* eslint no-new: "off" */
    });
  }

  render() {
    const mapStyles = {
      width: '100%',
      height: '100vh',
    };

    return (<div className="app">
      <div
        id="map"
        ref={(mapContainer) => { this.mapContainer = mapContainer; }}
        className="mapContainer"
        style={mapStyles}
      />
    </div>);
  }
}

App.propTypes = {
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
};

export default App;
