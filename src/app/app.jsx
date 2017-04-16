import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GoogleMapsLoader from 'google-maps';
import debounce from 'debounce';

GoogleMapsLoader.KEY = 'AIzaSyBkpSg1zTJoZxGqVyfaZmQ26j6W-LPlb-s';
GoogleMapsLoader.REGION = 'PH';


function initGetCircle(symbol, timeComparator) {
  return function getCircle(item) {
    const style = {
      icon: {
        path: symbol,
        fillColor: 'red',
        fillOpacity: 0.2,
        scale: (item.f.mag ** 2) / 2,
        strokeColor: 'white',
        strokeWeight: 0.5,
      },
    };

    if(typeof timeComparator === 'function') {
      style.visible = timeComparator(item.f.time);
    }

    return style;
  };
}

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
      selectedEvent: {},
      filter: 0
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
    const mapStyles = {
      width: '100%',
      height: 'calc(100vh - 64px)',
    };
    const { data, map, selectedEvent, filter } = this.state;

    if (map !== null) {
      /*
        TODO:
          - Filter data by time
          - Add UI controls for checking time
          - Add annotations
      */
      map.data.setStyle(initGetCircle(google.maps.SymbolPath.CIRCLE, (time) => {
        const min = new Date();
        const now = new Date();
        min.setDate(now.getDate() - filter);
        return time > min.getTime() && time <= now.getTime();
      }));
      map.data.addGeoJson(data);

    }

    if(filter !== 0) {
      console.log(map);
    }

    return (<div className="app">
      <div
        id="map"
        ref={(mapContainer) => { this.mapContainer = mapContainer; }}
        className="mapContainer"
        style={mapStyles}
      />
      <div className="event-details container">
        <div className="event-details__wrapper">
          <div className="event-details__title">
            { selectedEvent.title }
          </div>
          <div className="event-details__time">
            { selectedEvent.time ? (new Date(selectedEvent.time)).toString() : '' }
          </div>
        </div>
        <div className="event-details__controls" onChange={this.handleOnChange}>
          <input type="radio" id="timeSelector-7d" name="timeSelection" value="7" /> 7 Days Ago
          <input type="radio" id="timeSelector-30d" name="timeSelection" value="30" /> 30 Days Ago
        </div>
      </div>
    </div>);
  }
}

App.propTypes = {
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
};

export default App;
