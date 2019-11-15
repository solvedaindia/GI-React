import React from 'react';
import apiManager from '../../utils/apiManager';
import {
    storeAPI,
    imagePrefix,
    mapKey
} from '../../../public/constants/constants';
import { isMobile } from '../../utils/utilityManager';
import '../../../public/styles/store/store.scss';
import Geocode from "react-geocode";
import appCookie from '../../utils/cookie';
import StoreDetails from '../ExStore/storeDetails';

export class KitchenStore extends React.Component {
 
    constructor(props) {
        super(props);
        this.state = {
            storeData: null,
            long: null,
            lat: null,
            isLoading: false,
            error: null
        };
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
            <StoreDetails longitude={long || '72.925430'} latitude={lat || '19.102543'} />
		);
	}
}

export default KitchenStore;
