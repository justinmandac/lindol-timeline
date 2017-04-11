/* eslint-disable */
import 'styles/index.scss';
import App from 'app/app';
import API from 'app/api';

API().then((xhr) => {
    console.log(xhr);
});
