import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import EqDrawer from './drawer.component';
import Map from './map';

class App extends Component {
  render() {    
    return (
      <div>
        <AppBar />
        <div className="map-container container">
          <div className="app-map">
            <Map />
          </div>
          <EqDrawer />
        </div>
      </div>
    );
  }
}

export default App;
