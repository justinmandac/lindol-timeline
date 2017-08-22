import React, { Component } from 'react';
import * as d3 from 'd3';
import L from 'leaflet';
import 'mapbox-gl-leaflet/leaflet-mapbox-gl';
import WVFLayer from './wvf.layer';
import {PH_CENTER_LAT, PH_CENTER_LONG, MAPBOX_TOKEN, MAP_BOX_STYLE} from './constants';

const geojsonMarkerOptions = {
  radius: 5,
  //fillColor: "#ff7800",
  opacity: 1,
  fillOpacity: 0.8
};

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.map_ = {};
    this.layer_ = {};
    this.popup_ = L.popup();
  }

  componentDidMount() {
    const gl = new L.MapboxGL({
      accessToken : MAPBOX_TOKEN,
      style: MAP_BOX_STYLE,
    });
    this.map_ = new L.Map('earthquake-app-map', {center: [PH_CENTER_LAT, PH_CENTER_LONG], zoom: 7});

    gl.addTo(this.map_);

    (new WVFLayer())
      .init(L, this.map_)
      .load();

  }

  displayPopUp(e) {
    this.popup_
    .setLatLng(e.latlng)
    .setContent("You clicked the map at ")
    .openOn(this.map_);
  }

  render() {
  // Check if map is defined.
  const isMapDefined = !!Object.keys(this.map_).length;

  if(isMapDefined) {
    // Clear everything when props change.
    this.map_.removeLayer(this.layer_);

    this.layer_ = L.geoJSON(this.props.geojson.features, {
      pointToLayer: function (feature, latlng) {
        const style = Object.assign({}, geojsonMarkerOptions, {
          radius: Math.exp(feature.properties.mag/1.01-0.13)/10,
        });
        return L.circleMarker(latlng, style);
      }
     })
     .bindPopup((e) => {
       return `
          ${Date(e.feature.updated)}<br />
          ${e.feature.properties.title}`;
     });

    this.layer_.addTo(this.map_);
  }

    return (
      <div id="earthquake-app-map"></div>
    );
  }
}