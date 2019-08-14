import React from 'react';
import apiManager from '../../utils/apiManager';
import {
    storeAPI,
    imagePrefix
} from '../../../public/constants/constants';
import { isMobile } from '../../utils/utilityManager';
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
        apiManager.get(`${storeAPI}?latitude=${this.state.testLat}&longitude=${this.state.testLong}`)
        .then( response => {
            this.setState({
                storeData: response.data.data,
                isLoading: false
            })
            console.log('@@@@ Store Data @@@@@', response.data.data);
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
        if ( storeData == '') return null;
		return (
            !!storeData && storeData.map((storeLocData, index) => (
                <div className='exStore' key={index}>
                    {!isMobile() ? 
                        <img className='img' src={`${imagePrefix}/images/godrejInterio/store-bg-2x.png`} alt='Store Image'/> 
                        : 
                        <img className='img' src={`${imagePrefix}/images/godrejInterio/store-bg-mweb.png`} alt='Store Image'/> 
                    }
                    <div className='content'>
                        {!isMobile() && <h2 className='subTitle'>Our Stores</h2>}
                        <h1 className='title'>Experience Our Stores</h1>
                        {!isMobile() ? <p className='details'>Experience our products at <span className='place'>{storeLocData.city[0]}</span><span className='dist'>({storeLocData.distance[0]}) km away.</span><br></br>You can find more stores around you.</p> : <p className='details'>Experience products at <span className='place'>{storeLocData.city[0]}</span><span className='dist'>({storeLocData.distance[0]})</span> near you.</p>} 
                        {!isMobile() ? <a href='/storelocator' ><button className='btn-flat'>Find More Stores</button></a> : <a href='/storelocator' ><button className='btn-flat'>Explore More Stores</button></a> }
                    </div>
                </div>
            ))
		);
	}
}

export default ExStore;
