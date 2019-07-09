import React, { Component } from 'react';
import { render } from 'react-dom';
import Map from './Map';
//import './style.css';

const googleMapsApiKey = "AIzaSyDurZQBXjtSzKeieXwtFeGe-jhZu-HEGQU";
//const googleMapsApiKey = "AIzaSyCqIhTMIITk2PXT2iuvgFNzuUGB7vQG4-M";

class App extends Component {

  componentDidMount() {
    console.log('latAndLnglatAndLnglatAndLng', this.props)
  }

  render() {
      
    const places = [
        // {latitude: 25.8103146,longitude: -80.1751609},
        // {latitude: 27.9947147,longitude: -82.5943645},
        // {latitude: 28.4813018,longitude: -81.4387899}
        {latitude: 28.36552,longitude: 79.41523},
        {latitude: 13.10127,longitude: 80.28730},
        {latitude: 20.26212,longitude: 85.81492}
      ];
    return (
    <Map
      googleMapURL={
        'https://maps.googleapis.com/maps/api/js?key=' +
        googleMapsApiKey +
        '&libraries=geometry,drawing,places'
      }
      markers={places}
      loadingElement={<div style={{height: `100%`}}/>}
      containerElement={<div style={{height: "80vh"}}/>}
      mapElement={<div style={{height: `100%`}}/>}
      defaultCenter={{lat: 13.10127, lng: 80.28730}}
      defaultZoom={11}
    />
  );
};
}

export default App;




