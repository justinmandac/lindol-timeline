import React, { Component } from 'react';
import * as d3 from 'd3';
import L from 'leaflet';
import 'mapbox-gl-leaflet/leaflet-mapbox-gl';
import WVFLayer from './wvf.layer';
import {PH_CENTER_LAT, PH_CENTER_LONG} from './constants';

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.map_ = {};
  }

  componentDidMount() {
    const gl = new L.MapboxGL({
      accessToken : 'pk.eyJ1IjoianVzdGlubWFuZGFjIiwiYSI6ImNqNmczc3FyajA1NHgycHBrNzlneW9oMG0ifQ.eF_q_8CkR4-vlGhBAMqhtw',
      style: 'mapbox://styles/mapbox/dark-v9',
    });
    this.map_ = new L.Map('earthquake-app-map', {center: [PH_CENTER_LAT, PH_CENTER_LONG], zoom: 7});

    gl.addTo(this.map_);

    (new WVFLayer())
      .init(L, this.map_)
      .load();
  }

  render() {
    return (
      <div id="earthquake-app-map"></div>
    );
  }
}