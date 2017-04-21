/**
 * @fileoverview Component definition for the Header.
*/
import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';

import getDaysAgo from './utils/date-formatter';
const menuButtonStyles = {
  cursor: 'pointer'
};
const EarthquakeAppHeader = props => <header className="header">
  <IconButton 
    style={menuButtonStyles}
    className="menu-icon"
    onTouchTap={props.onMenuClicked}
  >
    <MenuIcon />
  </IconButton>
  <Paper className="card header__date-card">
    {getDaysAgo(props.value)}
  </Paper>
</header>;

EarthquakeAppHeader.defaultProps = {
  value: 0,
  onMenuClicked: () => {}
};

EarthquakeAppHeader.propTypes = {
  value: PropTypes.number,
  onMenuClicked: PropTypes.func
};

export default EarthquakeAppHeader;
