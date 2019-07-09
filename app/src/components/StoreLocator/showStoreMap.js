/* global google */
import React from "react";
import {
  withGoogleMap,
  GoogleMap,
  withScriptjs,
  Marker,
  DirectionsRenderer
} from "react-google-maps";

class MapDirectionsRenderer extends React.Component {
  state = {
    directions: null,
    error: null
  };

  // componentDidMount() {
  //   const { places, travelMode } = this.props;
  //   console.log('placesplacesplaces', places);
    
  //   const waypoints = places.map(p =>({
  //       location: {lat: p.latitude, lng:p.longitude},
  //       stopover: true
  //   }))
    
  //   console.log('waypointswaypointswaypoints')
  //   const origin = waypoints.shift().location;
  //   const destination = waypoints.pop().location;

  //   console.log('waypointswaypoints', waypoints);
  //   console.log('originorigin', origin);
  //   console.log('destination', destination);
    
    

  //   const directionsService = new google.maps.DirectionsService();
  //   directionsService.route(
  //     {
  //       origin: origin,
  //       destination: destination,
  //       travelMode: travelMode,
  //       waypoints: waypoints        
  //     },
  //     (result, status) => {
  //       if (status === google.maps.DirectionsStatus.OK) {
  //         this.setState({
  //           directions: result
  //         });
  //       } else {
  //         this.setState({ error: result });
  //       }
  //     }
  //   );

    
  // }

  Map() { alert('hey baba ji kirpa karo');withScriptjs(
    withGoogleMap(props => (
      <GoogleMap
        defaultCenter={props.defaultCenter}
        defaultZoom={props.defaultZoom}
      >
        {props.markers.map((marker, index) => {
          const position = { lat: marker.latitude, lng: marker.longitude };
          return <Marker key={index} position={position} />;
        })}
      </GoogleMap>
    ))
  );
      }

  render() {
    // console.log('this.state.directionsthis.state.directions=>>###', this.state.directions);
    // if (this.state.error) {
    //   return <h1>{this.state.error}</h1>;
    // }
    // return ( 'hello')
    console.log('this.propsthis.props', this.props)
    const data = this.Map(this.props);

      return (data);
  }
}

const Map = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      defaultCenter={props.defaultCenter}
      defaultZoom={props.defaultZoom}
    >
      {props.markers.map((marker, index) => {
        const position = { lat: marker.latitude, lng: marker.longitude };
        return <Marker key={index} position={position} />;
      })}
    </GoogleMap>
  ))
);

export default MapDirectionsRenderer;