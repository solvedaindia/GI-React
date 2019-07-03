import React from 'react';
import { GoogleApiWrapper, InfoWindow, Map, Marker } from 'google-maps-react';
/*import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { typography } from 'material-ui/styles';*/

class GoogleMapsContainer extends React.Component {
    
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      lat: 28.36552,
      lng: 79.41523
    }
    // binding this to event-handler functions
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMapClick = this.onMapClick.bind(this);
  }
  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }
  onMapClick = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  }

  componentWillReceiveProps() {
      this.setState({
        lat: this.props.storeData.data[0].latitude,
        lng: this.props.storeData.data[0].longitude
      })
  }
  render() {
    console.log('this.state.lat=>>', this.state.lat);
    console.log('this.state.lng=>>', this.state.lng);
    const style = {
      height: '100vh', 
      width: '100%',
    } 
    return (
        <>
      <Map
        style = { style }
        google = { this.props.google }
        onClick = { this.onMapClick }
        zoom = { 11 }
        initialCenter = {{ lat: this.state.lat, lng: this.state.lng}}
      >
        <Marker
          onClick = { this.onMarkerClick }
          title = { 'Changing Colors Garage1' }
          position = {{ lat: this.state.lat, lng: this.state.lng }}
          name = { 'Changing Colors Garage1' }
        />
        <InfoWindow
          marker = { this.state.activeMarker }
          visible = { this.state.showingInfoWindow }
        >
          
            
            <h4>Changing Colors Garage</h4>
           
            <p>
              98G Albe Dr Newark, DE 19702 <br />
              302-293-8627
            </p>
          
        </InfoWindow>
      </Map>

          </>
    );
  }
}
//const GOOGLE_API_KEY_GOES_HERE = 'AIzaSyCqIhTMIITk2PXT2iuvgFNzuUGB7vQG4-M';
export default GoogleApiWrapper({
    api: ('AIzaSyCqIhTMIITk2PXT2iuvgFNzuUGB7vQG4-M')
})(GoogleMapsContainer)