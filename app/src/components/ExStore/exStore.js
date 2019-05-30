import React from 'react';
import apiManager from '../../utils/apiManager';
import {
    storeAPI,
} from '../../../public/constants/constants';
import '../../../public/styles/store/store.scss';

export class ExStore extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            storeData: null,
            long: this.props.longitude,
            lat: this.props.latitude,
            testLat: '13.10127',
            testLong: '80.2873',
            isLoading: false,
            error: null
        };
    }
    
    getStoreData() {
        apiManager.get(`${storeAPI}?latitude=${this.state.testLat}&longitude=${this.state.testLong}&type=GIS`)
        .then( response => {
            this.setState({
                storeData: response.data.data.PhysicalStore,
                isLoading: false
            })
            console.log('@@@@ Store Data @@@@@', response.data.data.PhysicalStore);
        })
        .catch(error => {
            this.setState({
                error,
                isLoading: false
            });
        });
    }

    componentDidMount() {
        this.getStoreData();
	}

	render() {
		const { storeData } = this.state;
		return (
            !!storeData && storeData.map((storeLocData, index) => (
                <div className='exStore' key={index}>
                    <img className='img' src='https://192.168.0.36:8443/wcsstore/GodrejInterioSAS/images/godrejInterio/godrejstore-banner.png' alt='Store Image'/>
                    <div className='content'>
                        <h2 className='subTitle'>Our Stores</h2>
                        <h1 className='title'>Experience Our Stores</h1>
                        <p className='details'>Experience our products at <span className='place'>{storeLocData.city}</span><span className='dist'>({storeLocData.distance}) km away.</span><br></br>You can find more stores around you.</p>
                        <button className='btn-flat'>Find More Stores</button>
                    </div>
                </div>
            ))
		);
	}
}

export default ExStore;
