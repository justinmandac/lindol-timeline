import React from 'react';
const BASE_CLASS = 'header app-header';

const Header = ({ visible = true }) => (
  <header className={ `${BASE_CLASS} ${visible ? '-visible' : ''}`}>
    App Header
  </header>
);

export default Header;