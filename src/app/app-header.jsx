/**
 * @fileoverview Component definition for the Header.
*/
import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';

import getDaysAgo from './utils/date-formatter';

const EarthquakeAppHeader = props => <header className="header">
  <Paper className="card header__date-card">
    {getDaysAgo(props.value)}
  </Paper>
</header>;

EarthquakeAppHeader.defaultProps = {
  value: 0,
};

EarthquakeAppHeader.propTypes = {
  value: PropTypes.number,
};

export default EarthquakeAppHeader;
