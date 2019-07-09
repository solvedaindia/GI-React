import React, { Component } from 'react';
import { render } from 'react-dom';
//import ShowStoreMap from './showStoreMap';
import { GoogleMap, Marker, withScriptjs, withGoogleMap, InfoWindow } from "react-google-maps";

//import './style.css';

const googleMapsApiKey = "AIzaSyDurZQBXjtSzKeieXwtFeGe-jhZu-HEGQU";
//const googleMapsApiKey = "AIzaSyCqIhTMIITk2PXT2iuvgFNzuUGB7vQG4-M";

class MarkerData extends Component {

  constructor(props) {
    super(props);
    this.state = {
        isOpen: false,
        Infokey: null
    
    };
    
}

  componentDidMount() {
    console.log('latAndLnglatAndLnglatAndLng', this.props)
  }

  componentWillReceiveProps() {
    alert();
  }

  handleToggleOpen = (index) => {

    this.setState({
        isOpen: !this.state.isOpen,
        Infokey: index
    });
    console.log('this.state.Val=>>??', this.state);
}

handleToggleClose = () => { alert('babab');
    this.setState({
        isOpen: false,
        Infokey: null
    });
}


  render() {
    console.log('markersmarkersmarkers=##$$%%',this.props.markers);
      
    // const places = [
    //     {latitude: 28.36552,longitude: 79.41523},
    //     {latitude: 13.10127,longitude: 80.28730},
    //     {latitude: 20.26212,longitude: 85.81492}
    //   ];
      
    const places = this.props.markers;
    console.log('placesplaces', places)
    //alert(places[0].latitude);alert(places[0].longitude)
    return (
      <>
      {
        this.props.storeData.map((item, index) => { console.log('this.state.Infokey=>'+this.state.Infokey+'=>', index);
            return(
                <div key={index}>
            <Marker onClick={() => this.handleToggleOpen(index)} position={{lat: parseFloat(item.latitude), lng: parseFloat(item.longitude)}}  >
            { this.state.Infokey === index &&
            <InfoWindow>
           <div>
            <h4>Changing Colors Garage</h4>
   
    <p>
      98G Albe Dr Newark, DE 19702 <br />
      302-293-8627
    </p>
    </div>
  </InfoWindow>
            }
            
  </Marker>

  </div>
            )
        })
    }
    </>
    
  );
};
}

export default MarkerData;




