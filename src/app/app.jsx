import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GoogleMapsLoader from 'google-maps';
import debounce from 'debounce';
import API from './api.js';

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
      currentDate: null,
      google: null,
      map: null,
      data: {}, // data from API
      zoom: 5,
      showAll: false,
      selectedEvent: null,
      selectedMarker: null,
      filter: 0,// filter value in days,
      sidebarOpened: false,
      infoWindow: null
    };
  }

  componentWillMount() {

    API(this.props.lat, this.props.lng, 942).then(data => {
      this.setData(data);
    });
  }

  componentDidMount() {
    const clickHandler = (ctx) => (e) => {
        console.log(e);
        const {
          map,
          infoWindow,
          google,
          selectedMarker
        } = ctx.state;
        const content = generateInfoWindow(e.feature.f.title);
        const marker = new google.maps.Marker({
          position: e.latLng,
          map: map
        });

        ctx.setState({
          selectedEvent: e.feature.f,
          selectedMarker: marker,
          zoom: 10,
        });
        // Center and zoom onto the clicked marker
        map.setCenter(e.latLng);
        map.setZoom(ctx.state.zoom);
        // display infoWindow but clear existing ones first
        clearMarker(selectedMarker);
        infoWindow.setContent(content);
        infoWindow.open(map, marker);

    };

    const mapsCallback = (google) => {
      const {lat, lng, zoom} = this.state;
      const el = this.mapContainer;
      const map = new google.maps.Map(el, {
        disableDefaultUI: true,
        zoom,
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
      });
      map.data.addListener('click', debounce(clickHandler(this), 200));
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
      currentDate: new Date(data.metadata.generated)
    });
  }
  /**
   * @function handleOnChange
   * Handles changes to the slider's value.
   *
   * @param {Event} evt - MouseEvent. Not used
   * @param {number} value - the slider value.
  */
  handleOnChange = (evt, value) => {
    /*
      Clear any visible markers if the user changes the slider position
      in order to prevent orphaned markers and infowindows when the displayed
      events changes.
    */
    clearMarker(this.state.selectedMarker);
    this.setState({
      filter: parseInt(value, 10),
      selectedEvent: null,
      selectedMarker: null
    });
  }
  /**
   * @function handleDateChanged
   * Callback for the DatePicker's onChange.
   * @param {Event} evt
   * @param {Date} date
  */
  handleDateChanged = (evt, date) => {
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
  /**
   * @function handleMenuClicked
   * Handles the onClick event fired by the Menu Icon
  */
  handleMenuClicked = () => {
    this.setState((prevState, props) => {
      return {
        sidebarOpened: !prevState.sidebarOpened
      };
    });
  }
  /**
   * @function handleSeeAllToggle
   * @param {Proxy} evt
   * @param {boolean} showAll
  */
  handleSeeAllToggle = (evt, showAll) => {
    this.setState({
      showAll,
    });
  }

  render() {
    const { data,
            map,
            selectedEvent,
            filter,
            sidebarOpened,
            currentDate,
            showAll,
          } = this.state;
    const isMapReady = map !== null;

    /**
     * Currently limiting the retrieved dataset from the current date to
     * the past 100 days.
    */
    const minDate = getDateAgo(100);

    if (isMapReady) {
      if(!showAll) {
        map.data.setStyle(initGetCircle(google.maps.SymbolPath.CIRCLE,
                                      dailyComparator(filter)));
      } else {
        map.data.setStyle(initGetCircle(google.maps.SymbolPath.CIRCLE, null));
      }
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
          <EventControls
           onChange={this.handleOnChange}
           onSeeAllToggle={this.handleSeeAllToggle}
           value={filter}
          />
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
