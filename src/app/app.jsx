import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GoogleMapsLoader from 'google-maps';
import debounce from 'debounce';

import EventDetails from './event-details.jsx';
import EventControls from './event-controls.jsx';
import initGetCircle, { dailyComparator } from './init-get-circle.js';
import Paper from 'material-ui/Paper';
import EarthquakeAppHeader from './app-header.jsx';
import MainDrawer from 'material-ui/Drawer';
import { getDiff } from './utils/date-formatter';

GoogleMapsLoader.KEY = 'AIzaSyBkpSg1zTJoZxGqVyfaZmQ26j6W-LPlb-s';
GoogleMapsLoader.REGION = 'PH';

const paperStyle = {
  width: '100%',
  margin: '0 auto',
  height: '100%',
  padding: '8px'
};

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
      filter: 0,// filter value in days,
      sidebarOpened: false,
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
        mapTypeId: 'roadmap',
      }); /* eslint no-new: "off" */
      const clickHandler = (e) => {
          console.log(e);
          e.ya.preventDefault();
          this.setState({
            selectedEvent: e.feature.f,
          });
      };
      // initialize map data points style
      map.data.addListener('click', debounce(clickHandler, 200));

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
    });
  }

  handleDateChanged = (evt, date) => {
    this.setState({
      filter: getDiff(new Date(), date)
    });
  }

  handleMenuClicked = () => {
    console.log('menu clicked');
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
        <div className="event-details">
          <div className="event-details__paper-wrapper">
                <Paper style={paperStyle}>
                  <div className="container">
                    <EventControls onChange={this.handleOnChange} value={filter}/>
                    <EventDetails title={selectedEvent.title} />  
                  </div>              
                </Paper> 
          </div>       
        </div>        
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
    </div>);
  }
}

App.propTypes = {
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
};

export default App;
