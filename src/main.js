/* eslint-disable */
import 'styles/index.scss';

import React from 'react';
import ReactDOM from 'react-dom';

import App from 'app/app.jsx';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// TODO: Move API call to app and enable acquisition of events 100 days prior to current date
const lat = 12.8797; // PH Latitude
const lng = 121.7740; // PH Longitude
const radius = 942; // Approx radius of PH around coords. Used the sqrt of PH area as radius
// plus a ~200km fudge factor
let ref;
const AppRender = <MuiThemeProvider>
    <App lat={lat} lng={lng} ref={ (app) => { ref = app; } }/>
</MuiThemeProvider>;

injectTapEventPlugin();

ReactDOM.render(AppRender, document.getElementById('root'));
