import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GoogleMapsLoader from 'google-maps';

GoogleMapsLoader.KEY = 'AIzaSyBkpSg1zTJoZxGqVyfaZmQ26j6W-LPlb-s';
GoogleMapsLoader.REGION = 'PH';

//            'latitude=12.8797&' + // PH latitude
            // 'longitude=121.7740&

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      debug: false,
    };
  }

  componentDidMount() {
    GoogleMapsLoader.load((google) => {
      const el = this.mapContainer;
      new google.maps.Map(el, {
        zoom: 5,
        center: {
          lat: 12.8797,
          lng: 121.7740,
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

App.PropTypes = {
  debug: PropTypes.bool,
};

export default App;
