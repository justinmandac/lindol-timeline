import React from 'react';
import Paper from 'material-ui/Paper';

const paperStyle = {
  width: '100%',
  margin: '0 auto',
  height: '100%',
  padding: '8px'
};


const EarthquakeAppBottomBar = (props) => <div className="event-details">
  <div className="event-details__paper-wrapper">
    <Paper style={paperStyle}>
      <div className="container">
          {props.children}
      </div>              
    </Paper> 
  </div>       
</div> ;

export default EarthquakeAppBottomBar;