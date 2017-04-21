/**
 * @fileoverview Component definition for the Header.
*/
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import DatePicker from 'material-ui/DatePicker';
import getDaysAgo, {formatDate, getDateAgo } from './utils/date-formatter';

const menuButtonStyles = {
  cursor: 'pointer'
};

const pickerTextFieldStyle = {
  width: '100%',
  textAlign: 'center',
};

class EarthquakeAppHeader extends Component {
  render() {
    const { onMenuClicked, onDateChanged, value } = this.props;
    const dateFromValue = getDateAgo(value);
    console.debug('dateFromValue', value, dateFromValue);
    return (<header className="header">
      <IconButton 
        style={menuButtonStyles}
        className="menu-icon"
        onTouchTap={onMenuClicked}
      >
        <MenuIcon />
      </IconButton>
      <Paper className="card header__date-card">
        <div className="date-card__picker-container">
          <DatePicker 
            id="headerDatePicker"
            value={dateFromValue}
            formatDate={formatDate}
            textFieldStyle={pickerTextFieldStyle}
            onChange={onDateChanged}
            maxDate={new Date()}
          />
        </div>
      </Paper>
    </header>);
  }

}


EarthquakeAppHeader.defaultProps = {
  value: 0,
  onMenuClicked: () => {},
  onDateChanged: () => {}
};

EarthquakeAppHeader.propTypes = {
  value: PropTypes.number,
  onMenuClicked: PropTypes.func,
  onDateChanged: PropTypes.func
};

export default EarthquakeAppHeader;
