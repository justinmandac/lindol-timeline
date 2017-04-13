/* eslint-disable */
import 'styles/index.scss';

import React from 'react';
import ReactDOM from 'react-dom';

import App from 'app/app.jsx';
import API from 'app/api';

const lat = 12.8797; // PH Latitude
const lng = 121.7740; // PH Longitude
const radius = 942; // Approx radius of PH around coords. Used the sqrt of PH area as radius
// plus a ~200km fudge factor
let ref;
const AppRender = <App lat={lat} lng={lng} ref={ (app) => { ref = app; } }/>;

API(lat, lng, radius).then((data) => {
    ref.setData(data);
});

ReactDOM.render(AppRender, document.getElementById('root'));
