import React, { Fragment } from 'react';
import apiManager from '../../utils/apiManager';
import { GoogleMap, Marker, withScriptjs, withGoogleMap } from "react-google-maps";
import {
    storeAPI,
    storeCityAPI,
    ipDataApi
} from '../../../public/constants/constants';
import '../../../public/styles/store/locator.scss';
import Img1 from '../../../public/images/store/furniture-stores-black.png';
import Img2 from '../../../public/images/store/mattress-stores-grey.png';
import Img3 from '../../../public/images/store/kitchen-galleries-grey.png';
import Img4 from '../../../public/images/store/b-2-b-experience-stores-grey.png';

function Map(){
    return (
        <GoogleMap
            defaultZoom={10}
            defaultCenter={{lat: 13.10127, lng: 80.2873}}
        />
    );
}
const WrappedMap = withScriptjs(withGoogleMap(Map));
const NUMB_REG = /^\d+$/;

class StoreLocator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            storeData: null,
            isLoading: false,
            ipData: null,
            testLat: '13.10127',
            testLong: '80.2873',
            storeType: 'GIS',
            error: null,
            ipData: null
        };
    }

    handleStoreType(storeType) {
        this.setState({

            storeType
        }, 
        () => this.handleStoreSearch())
    }
    handleStoreSearch(){
        if(this.inputRef) {
            var val = this.inputRef.value;
            if(!val) return;
            if(NUMB_REG.test(val)) {
                //pincode section
            }
            else {
                this.getSToreDataByCity(val);
            }
        }
    }
    getIPData() {
		apiManager
		.get(ipDataApi, { headers: { Accept: 'application/json' } })
		.then(response => {
			this.setState({
			ipData: response.data,
			isLoading: false,
			});
			console.log('@@@@ IP DATA RESPONSE @@@@@', response.data);
		})
		.catch(error => {
			this.setState({
			error,
			isLoading: false,
			});
		});
    }
    
    getStoreData() {
        apiManager.get(`${storeAPI}?latitude=${this.state.testLat}&longitude=${this.state.testLong}&type=${this.state.storeType}`)
        .then( response => {
            this.setState({
                storeData: response.data.data,
                isLoading: false
            })
            console.log('@@@@ Store Locator Data Whole@@@@@', response.data.data);
        })
        .catch(error => {
            this.setState({
                error,
                isLoading: false
            });
        });
    }

    getSToreDataByCity(city) {
        apiManager.get(`${storeCityAPI}?cityname=${city}&type=${this.state.storeType}`)
        .then( response => {
            this.setState({
                storeData: response.data.data,
                isLoading: false
            })
            console.log('@@@@ Store Locator Data City@@@@@', response.data.data);
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
        this.getIPData();
	}

	render() {
		const { storeData } = this.state;
		return (
            !!storeData &&
            <Fragment>
                <div className='storeLocator'>
                    <h1 className='title'>Find your closest store</h1>
                    <div className='field'>
                        <input type='text' className='pc-field' ref={(ref)=> {this.inputRef=ref}}/>
                        <button type="button" className='pc-btn' onClick={this.handleStoreSearch.bind(this)}>Find Stores</button>
                    </div>
                    <div className='storeTypes'>
                        <ul className='typeList'>
                            <li className='storeTypeItem' onClick={this.handleStoreType.bind(this,'GIS')}>
                                <figure className='typeList'><img src={Img1} className='storeImg'/></figure>
                                <figcaption>
                                    Home Furniture Stores
                                </figcaption>
                            </li>
                            <li className='storeTypeItem' onClick={this.handleStoreType.bind(this,'KG')}>
                                <figure className='typeList' ><img src={Img2} className='storeImg'/>
                                    
                                </figure>
                                <figcaption>
                                    Mattress Stores
                                </figcaption>
                            </li>
                            <li className='storeTypeItem' onClick={this.handleStoreType.bind(this,'MS')}>
                                <figure className='typeList'><img src={Img3} className='storeImg'/>
                                </figure>
                                <figcaption>
                                    Kitchen Galleries
                                </figcaption>
                            </li>
                            <li className='storeTypeItem' onClick={this.handleStoreType.bind(this,'GIS')}>
                                <figure className='typeList'><img src={Img4} className='storeImg'/>
                                </figure>
                                <figcaption>
                                    B2B Experience Stores
                                </figcaption>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="storeDetails">
                    <h1 className='title'>One stop destination for your furniture</h1>
                    <div className='storeList'>
                        
                        {<div className='detailCard'>
                            {!!storeData && storeData.PhysicalStore.map((physicalData) => {
                                return <p className='test'>{physicalData.city}</p>
                            }
                        )}
                        </div>  }
                        
                    </div>
                    <div className='mapContainer'>
                        <WrappedMap
                            googleMapURL = {`https://maps.googleapis.com/maps/api/js?key=AIzaSyDjWQfWqoY8qDkWk8aH6Zveb_qE6HaRFg4&callback=initMap`}
                            loadingElement = {<div style = {{height: '100%'}} />}
                            containerElement={<div style = {{height: '100%'}}/>}
                            mapElement={<div style = {{height: '100%'}}/>}
                        />
                    </div>
                </div>
                {/* { !!storeData && storeData.map((storedetailData, index) => {
                    return (
                        <div className="storeDetails">
                            <h1 className='title'>One stop destination for your furniture</h1>
                            <div className='storeList'>
                                <div className='detailCard' id={index}>
                                    {storedetailData.country}
                                </div>
                            </div>
                            <div className='mapContainer'>
                                <WrappedMap
                                    googleMapURL = {`https://maps.googleapis.com/maps/api/js?key=AIzaSyDjWQfWqoY8qDkWk8aH6Zveb_qE6HaRFg4&callback=initMap`}
                                    loadingElement = {<div style = {{height: '100%'}} />}
                                    containerElement={<div style = {{height: '100%'}}/>}
                                    mapElement={<div style = {{height: '100%'}}/>}
                                />
                            </div>
                        </div>
                    )
                })
                    
                } */}
                
                
            </Fragment>
		);
	}
}

export default StoreLocator;
