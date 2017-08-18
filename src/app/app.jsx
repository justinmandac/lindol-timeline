import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import EqDrawer from './drawer.component';
import Map from './map';

class App extends Component {
  retrieveDate({start, end}) {
    console.log('Date clicked', start, end);
  }
  render() {    
    return (
      <div>
        <AppBar />
        <Map />
        <EqDrawer handleDateClick={this.retrieveDate.bind(this)}/>
      </div>
    );
  }
}

export default App;
