import React from 'react';
import Geocode from "react-geocode";
import appCookie from '../../utils/cookie';
import StoreDetails from '../ExStore/storeDetails';
import apiManager from '../../utils/apiManager';
import {
    storeAPI,
    imagePrefix,
	mapKey
} from '../../../public/constants/constants';
import { isMobile } from '../../utils/utilityManager';
import '../../../public/styles/store/store.scss';
import ContentEspot from '../../components/Primitives/staticContent';

export class ExKitchens extends React.Component {
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
            !!lat && !!long &&
            <StoreDetails longitude={long} latitude={lat} />
		);
	}
}

export default ExKitchens;
