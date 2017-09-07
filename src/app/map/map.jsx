import React, { Component } from 'react';

import mapboxgl from 'mapbox-gl';
import { MAP_BOX_STYLE, MAPBOX_TOKEN } from './constants';

export default class Map extends Component {
  constructor() {
    super();
    mapboxgl.accessToken = MAPBOX_TOKEN;
    this.state = {
      map: null,
    };
  }

  componentDidMount() {
    console.log(this.mapElement);
    this.setState(
      (prevState, props) => Object.assign(prevState, {
        map : new mapboxgl.Map({
          container: this.mapElement,
          style: MAP_BOX_STYLE,
        }),
      })
    );
  }

  render() {
    return (
      <div
        ref={(div) => {this.mapElement = div}} 
        className="map">
      </div>
    );
  }
}