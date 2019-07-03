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
import MapData from "./map";

function Map(){
    return (
        <GoogleMap
            defaultZoom={10}
            defaultCenter={{lat: 28.36552, lng: 79.41523}}
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
            isLoading: true,
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
                this.getStoreDataByPincode(val);
            }
            else {
                this.getSToreDataByCity(val);
            }
        }
    }
    
    getStoreData(lat, long) {
        const data = {
            params: {
                latitude: lat,
                longitude: long
            },
          };
          
        apiManager.get(`${storeAPI}`, data)
        .then( response => {
            console.log('@@##$$%%%response=>>', response);
            this.setState({
                storeData: response.data,
                isLoading: false
            })
            console.log('@@@@ Store Locator Data Whole@@@@@', response.data.data);
        })
        .catch(error => {
            console.log()
            this.setState({
                error,
                isLoading: false
            });
        });
    }

    getSToreDataByCity(city) {
        const data = {
            params: {
                cityname: city,
            },
          };
        apiManager.get(`${storeCityAPI}`, data)
        .then( response => {
            //console.log('response.data.dataresponse.data.data=>>@@', response)
            this.setState({
                storeData: response.data,
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

    getStoreDataByPincode() {
        this.getLatAndLong();
    }

    getLatAndLong() {
        // apiManager.get(`https://maps.googleapis.com/maps/api/js?key=AIzaSyDjWQfWqoY8qDkWk8aH6Zveb_qE6HaRFg4&address=400079`)
        // .then( response => {
        //     console.log('@@##$$', response);
        //     this.setState({
        //         storeData: response.data.data,
        //         isLoading: false
        //     })
        //     console.log('@@@@ Store Locator Data Whole@@@@@', response.data.data);
        // })
        // .catch(error => {
        //     this.setState({
        //         error,
        //         isLoading: false
        //     });
        // });
        // Geocode.setApiKey("AIzaSyDjWQfWqoY8qDkWk8aH6Zveb_qE6HaRFg4");
        // // Get latidude & longitude from address.
        // Geocode.fromAddress("400079").then(
        //     response => {
        //     const { lat, lng } = response.results[0].geometry.location;
        //     console.log(lat, lng + '@@@@@@@');
        //     },
        //     error => {
        //     console.log(error);
        //     }
        // );
 
        const lat = 1.337130;
        const long = 103.736900;
        this.getStoreData(lat, long);

    }
    
	componentDidMount() {
        this.getStoreData(this.state.testLat, this.state.testLong);
    }
    

	render() { 
        const { storeData } = this.state;

		return (
            //!!storeData &&
            <Fragment>
                <div className='storeLocator'>
                    <h1 className='title'>Find your closest store</h1>
                    <div className='field'>
                        <input type='text' className='pc-field' ref={(ref)=> {this.inputRef=ref}}/>
                        <button type="button" className='pc-btn' onClick={this.handleStoreSearch.bind(this)}>Find Stores</button>
                    </div>
                    { !storeData &&
                    <div className='storeTypes'>
                        <h2>No stores within this pincode</h2>
                        <span>Please try another city or pincode</span>
                    </div>
                    }
                    { storeData &&
                    
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
                    }
                </div>
                { storeData &&
                <div className="storeDetails clearfix">
                
                    <h1 className='title'>One stop destination for your furniture</h1>
                    <div className='storeList'>
                        
                        {<div className='detailCard'>
                            {!!storeData && storeData.data.map((physicalData) => {
                                return(
                                    <>
                                        <div className='storeListItem'>
                                            <p>{physicalData.ribbonText}</p>
                                            <p><h2>{physicalData.storeName}</h2></p>
                                            <p>{physicalData.address1}, {physicalData.city} - {physicalData.pinCode}</p>
                                            <p>{physicalData.telephone}</p>
                                            <a href=''>Get Directions</a>
                                        </div>
                                    </>
                                );
                            }
                        )}
                        </div>  }
                        
                        
                    </div>
                    <div className='mapContainer' id='mapContainer'>
                        <WrappedMap
                            googleMapURL = {`https://maps.googleapis.com/maps/api/js?key=AIzaSyCqIhTMIITk2PXT2iuvgFNzuUGB7vQG4-M&callback=initMap`}
                            loadingElement = {<div style = {{height: '100%'}} />}
                            containerElement={<div style = {{height: '100%'}}/>}
                            mapElement={<div style = {{height: '100%'}}/>}
                        />
                        {/* <MapData storeData={this.state.storeData}/> */}
                    </div>                    
                </div>
                }
            </Fragment>
		);
	}
}

export default StoreLocator;
