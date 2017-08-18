/* eslint-disable */
import 'styles/index.scss';

import React from 'react';
import ReactDOM from 'react-dom';

import App from 'app/app.jsx';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const AppRender = () => (
  <MuiThemeProvider>
      <App />
  </MuiThemeProvider>
);

injectTapEventPlugin();

ReactDOM.render(<AppRender />, document.getElementById('root'));
