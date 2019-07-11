import React, { Component } from 'react';
import Map from './Map';
import {
	mapKey
} from '../../../public/constants/constants';
class Direction extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const places = [
			{latitude: parseFloat(this.props.match.params.originLat), longitude: parseFloat(this.props.match.params.originLng)},
			{latitude: parseFloat(this.props.match.params.destinationLat), longitude: parseFloat(this.props.match.params.destinationLng)},
		];
		return (
			<Map
				googleMapURL={'https://maps.googleapis.com/maps/api/js?key=' +mapKey +'&libraries=geometry,drawing,places'}
				markers={places}
				loadingElement={<div style={{height: `100%`}}/>}
				containerElement={<div style={{height: "80vh"}}/>}
				mapElement={<div style={{height: `100%`}}/>}
				defaultCenter={{lat: parseFloat(this.props.match.params.destinationLat), lng: parseFloat(this.props.match.params.destinationLng)}}
				defaultZoom={11}
			/>
		);
	};
}

export default Direction;




