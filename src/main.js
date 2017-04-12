/* eslint-disable */
import 'styles/index.scss';

import React from 'react';
import ReactDOM from 'react-dom';

import App from 'app/app.jsx';
import API from 'app/api';

API().then((xhr) => {
    console.log(xhr);
});

ReactDOM.render(<App/>, document.getElementById('root'));
