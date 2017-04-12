import React from 'react';
import GoogleMapsLoader from 'google-maps';

GoogleMapsLoader.KEY = 'AIzaSyBkpSg1zTJoZxGqVyfaZmQ26j6W-LPlb-s';
GoogleMapsLoader.REGION = 'PH';

console.log(GoogleMapsLoader);

GoogleMapsLoader.load((google) => {
  console.log(google);
});

const App = () =>
   (<div className="app">
     <div id="map" className="mapContainer" />
   </div>);

export default App;
