import React from 'react';
import { Link } from 'react-router-dom';
import apiManager from '../../utils/apiManager';
import {
    storeAPI,
    imagePrefix
} from '../../../public/constants/constants';
import { isMobile, getCookie } from '../../utils/utilityManager';
import '../../../public/styles/store/store.scss';
import ContentEspot from '../../components/Primitives/staticContent';
import {OUR_STORES, EXPERIENCE_OUR_STORES, EXP_OUR_PRODUCTS, KM_AWAY} from '../../constants/app/storeDetailsConstants'

export class StoreDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            storeData: null,
            isLoading: false,
            error: null
        };
    }
    
    /* get store details */
   
    getStoreData() {
        apiManager.get(`${storeAPI}?latitude=${this.props.latitude}&longitude=${this.props.longitude}`)
        .then( response => {
            this.setState({
                storeData: response.data.data[0],
                isLoading: false
            })
        })
        .catch(error => {
            this.setState({
                error,
                isLoading: false
            });
        });
    }
    /* get radius */
    toRadius(Value) {
        return Value * Math.PI / 180;
    }
    /* get distance from lat and long */
    getDistance(currentLat, currentLon, destiLat, destiLon) {
        const inKm = 6371; // km
        const dLat = this.toRadius(destiLat-currentLat);
        const dLon = this.toRadius(destiLon-currentLon);
        const getLat1 = this.toRadius(currentLat);
        const getLat2 = this.toRadius(destiLat);
        let getValueInKm = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(getLat1) * Math.cos(getLat2); 
        getValueInKm = 2 * Math.atan2(Math.sqrt(getValueInKm), Math.sqrt(1-getValueInKm)); 
        getValueInKm = inKm * getValueInKm;
        return getValueInKm.toFixed(1);
    }

    componentDidMount() {
        this.getStoreData();
	}

	render() {
        const { storeData, index } = this.state;
		return (
            
                <div className='exStore' key={index}>
                    {!isMobile() ? 
                       <ContentEspot espotName = { 'GI_EXP_STORE_WEB_IMG' } />: <ContentEspot espotName = { 'GI_EXP_STORE_MOBILE_IMG' } />
                    }
                    <div className='content'>
                        {!isMobile() && <h2 className='subTitle'>{OUR_STORES}</h2>}
                        <p className='title'>{EXPERIENCE_OUR_STORES}</p>
                        {
							!!storeData && !!storeData.latitude && storeData.latitude &&
                            <div className='details'>{EXP_OUR_PRODUCTS}
                                <Link
                                    className='storeLink'
                                    to={{ pathname: '/storelocator', state: { pincode: getCookie('pincode') } }}
                                >
                                    <span className='place'> {storeData.storeName}</span>
                                    <span className='dist'> ({this.getDistance(storeData.latitude, storeData.longitude, this.props.latitude, this.props.longitude)} {KM_AWAY}</span>
                                </Link>
                                {/* <span className='details'>{!isMobile() ?<p>You can find more stores around you.</p>: ' near you'}</span> */}
                                <span className='details'>
                                    <p>
                                        <Link to={{ pathname: '/storelocator', state: { pincode: getCookie('pincode') } }}>Click here </Link> to explore more stores near you.
                                    </p>
                                </span>
                            </div>
                        }
                        {/* <Link
                            className='storeLink'
                            to={{ pathname: '/storelocator', state: { pincode: getCookie('pincode') } }}
                        >
                            <button className='btn-flat'>{!isMobile() ?'Find More Stores' : 'Explore More Stores' }</button>
                        </Link>
                        <span className='storeLinkSpacer'>OR</span> */}
                        <Link className='storeLink' to="/request-callback">
                            <button className='btn-flat'>Request A Callback</button>
                        </Link>
                    </div>
                </div>
		);
	}
}

export default StoreDetails;
