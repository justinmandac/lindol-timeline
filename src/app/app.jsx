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
      google: null,
      map: null,
      data: {},
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

      // initialize map
      map.data.setStyle((item) => {
        const magnitude = item.f.mag;
        return {
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            fillColor: 'red',
            fillOpacity: 0.2,
            scale: (magnitude ** 2) / 2,
            strokeColor: 'white',
            strokeWeight: 0.5,
          },
        };
      });

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

  render() {
    const mapStyles = {
      width: '100%',
      height: '100vh',
    };
    const { data, map } = this.state;

    if (map !== null) {
      /*
        TODO:
          - Filter data by time
          - Add UI controls for checking time
          - Add annotations
      */
      map.data.addGeoJson(data);
    }

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
