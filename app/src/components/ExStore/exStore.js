import React from 'react';
import Geocode from "react-geocode";
import {
    mapKey
} from '../../../public/constants/constants';
import appCookie from '../../utils/cookie';
import '../../../public/styles/store/store.scss';
import StoreDetails from './storeDetails';

export class ExStore extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            storeData: null,
            long: null,
            lat: null,
            isLoading: false,
            error: null
        };
        console.log('Test props', this.props);
    }
    
    /* get lat and long */
    getLatAndLong(pinCode) { 
        Geocode.setApiKey(mapKey);
        Geocode.fromAddress(pinCode).then( response => {
            const { lat, lng } = response.results[0].geometry.location;
            this.setState({
                lat: lat,
                long: lng
            });
            console.log('Check Get Data - Store', response.results[0].geometry.location)
        })
        .catch(error => {
            this.setState({
                error,
                isLoading: false
            });
        });
    }

    componentDidMount() {
        this.getLatAndLong(appCookie.get('pincode'));
	}

	render() {
        const { lat, long } = this.state;
        
		return (
            !!lat && !!long &&
            <StoreDetails longitude={long} latitude={lat} />
		);
	}
}

export default ExStore;
