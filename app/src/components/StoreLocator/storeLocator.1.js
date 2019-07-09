import React, { Fragment } from 'react';
import apiManager from '../../utils/apiManager';
import { GoogleMap, Marker, withScriptjs, withGoogleMap } from "react-google-maps";
import { Link } from 'react-router-dom';
import {
    storeAPI,
    storeCityAPI,
    storeById
} from '../../../public/constants/constants';
import '../../../public/styles/store/locator.scss';
import Img1 from '../../../public/images/store/furniture-stores-black.png';
import Img2 from '../../../public/images/store/mattress-stores-grey.png';
import Img3 from '../../../public/images/store/kitchen-galleries-grey.png';
import Img4 from '../../../public/images/store/b-2-b-experience-stores-grey.png';
//import MapData from "./map";

function Map(){
    const position = { lat: 28.36552, lng: 79.41523 };
    return (
        <GoogleMap
            defaultZoom={10}
            defaultCenter={{lat: 28.36552, lng: 79.41523}}
            
        >
        <Marker key={1} position={position}  />
        <Marker key={1} position={{lat: 13.10127, lng: 80.2873}} />
        </GoogleMap>
    );
}

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
            ipData: null,
            searchStoreType: null,
            allstoreData: null
        };
        
    }

    handleStoreType(storeType) {
        let filterArr = new Array;

        for(let i = 0; i < this.state.allstoreData.data.length; i++) {
            if (this.state.allstoreData.data[i].type.indexOf(storeType) !== -1) {
                filterArr.push(this.state.allstoreData.data[i]);
            }
            
        }
        
        const obj= {'data': filterArr};
        
        this.setState({
            storeData: obj,
            isLoading: false,
        });
    }

    handleStoreSearch() {
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
                allstoreData: response.data,
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
            console.log('@@@@ Store Locator Data City@@@@@', response.data.data);
            this.setState({
                storeData: response.data,
                allstoreData: response.data,
                isLoading: false
            })
           
        })
        .catch(error => {
            console.log('=>>>####', error.response)
            this.setState({
                storeData: null,
                isLoading: false,
                searchStoreType: 'city'
            });
        });
    }

    getSToreDataById(id) {
        let storeId = '';
        for(let i = 0 ; i < id.length; i++) {
            if (i === 0) {
                storeId += `?physicalStoreId=${id[i]}`;
            } else {
                storeId += `&physicalStoreId=${id[i]}`;
            }

        }

        apiManager.get(`${storeById+storeId}`)
        .then( response => {
            console.log('responseresponse=>>>>@@##$$$$',response.data)
            this.setState({
                storeData: response.data,
                allstoreData: response.data,
                isLoading: false
            })
        })
        .catch(error => {
            console.log('=>>>####', error.response)
            this.setState({
                storeData: null,
                isLoading: false,
                searchStoreType: 'storeId'
            });
        });
    }


    getStoreDataByPincode() {
        this.getStoreData(this.state.testLat, this.state.testLong);
    }

    getLatAndLong() { //alert('==');


    //https://maps.googleapis.com/maps/api/geocode/json?address=400079&key=AIzaSyCqIhTMIITk2PXT2iuvgFNzuUGB7vQG4-M
    //apiManager.get('http://maps.googleapis.com/maps/api/js?key=AIzaSyCqIhTMIITk2PXT2iuvgFNzuUGB7vQG4-M&address=400079', {
        apiManager.get('http://maps.googleapis.com/maps/api/js?key=AIzaSyCqIhTMIITk2PXT2iuvgFNzuUGB7vQG4-M&address=400079', {
        headers: {
            method: 'GET',
            "Access-Control-Allow-Origin": '*',
            mode: 'no-cors'
        },
      }).then( response => {
            console.log('@@##$$', response.results[0].geometry.location.lat);
            // this.setState({
            //     storeData: response.data.data,
            //     allstoreData: response.data,
            //     isLoading: false
            // })
            console.log('@@@@ Store Locator Data Whole@@@@@', response);
        })
        .catch(error => {
            console.log('error response@@##$$%%=>>>', error);
            this.setState({
                error,
                isLoading: false
            });
        });
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
 
        // const lat = 1.337130;
        // const long = 103.736900;
        // this.getStoreData(lat, long);

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.location.state.storeName !== this.props.location.state.storeName) {
            this.getSToreDataByCity(nextProps.location.state.storeName);
            window.scrollTo(0, 0);
        }
    }
    
	componentDidMount() {
        if (this.props.location.state.storeId) {
            this.getSToreDataById(this.props.location.state.storeId);
        } else if (this.props.location.state.storeName){
            this.getSToreDataByCity(this.props.location.state.storeName);
        }
        //this.getLatAndLong();
        window.scrollTo(0, 0);
    }

	render() { 
        const WrappedMap = withScriptjs(withGoogleMap(Map));
        const { storeData } = this.state;
        console.log('storeDatastoreData', storeData);
        const places = [
            {latitude: 25.8103146,longitude: -80.1751609},
            {latitude: 27.9947147,longitude: -82.5943645},
            {latitude: 28.4813018,longitude: -81.4387899}
          ]

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
                        <h2>No stores within this {this.state.searchStoreType}</h2>
                        <span>Please try another city or pincode</span>
                    </div>
                    }
                    { storeData &&
                    
                    <div className='storeTypes'>
                        <ul className='typeList'>
                            <li className='storeTypeItem active' onClick={this.handleStoreType.bind(this,'Home Furniture Stores')}>
                                <figure className='typeList'><img src={Img1} className='storeImg'/></figure>
                                <figcaption className="storetext">
                                    Home Furniture Stores
                                </figcaption>
                            </li>
                            <li className='storeTypeItem' onClick={this.handleStoreType.bind(this,'Mattress Stores')}>
                                <figure className='typeList' ><img src={Img2} className='storeImg'/>
                                    
                                </figure>
                                <figcaption className="storetext">
                                    Mattress Stores
                                </figcaption>
                            </li>
                            <li className='storeTypeItem' onClick={this.handleStoreType.bind(this,'Kitchen Gallery')}>
                                <figure className='typeList'><img src={Img3} className='storeImg'/>
                                </figure>
                                <figcaption className="storetext">
                                    Kitchen Galleries
                                </figcaption>
                            </li>
                            <li className='storeTypeItem' onClick={this.handleStoreType.bind(this,'B2B Experience Stores')}>
                                <figure className='typeList'><img src={Img4} className='storeImg'/>
                                </figure>
                                <figcaption className="storetext">
                                    B2B Experience Stores
                                </figcaption>
                            </li>
                        </ul>
                    </div>
                    }
                </div>
                <div className="clearfix"></div>
                { storeData &&                
                <div className="storeDetails clearfix">
                
                    <h1 className='headingtitle'>One stop destination for your furniture</h1>
                    <div className='storeList'>
                        
                        {<div className='detailCard'>
                            {!!storeData && storeData.data.map((physicalData) => {
                                const getLatAndLong = { lat: physicalData.latitude, lng: physicalData.longitude}
                                return(
                                    <>
                                        <div className='storeListItem'>
                                            { physicalData.ribbonText &&
                                            <div className="modular_wardrobe">{physicalData.ribbonText}</div>
                                            }
                                            <p><h2>{physicalData.storeName}</h2></p>
                                            <p>{physicalData.address1} {physicalData.address2} {physicalData.address3}, {physicalData.city} - {physicalData.pinCode}</p>
                                            <p>{physicalData.telephone}</p>
                                            {/* <a href=''>Get Directions</a>&nbsp;&nbsp;&nbsp;&nbsp;{physicalData.ownership} */}
                                            <div className="direction_dealerwrp">
                                                <Link className="getDirection" target='_blank' to={{ pathname: '/direction', state: { latAndLng: 'getLatAndLong' } }}>
                                                  Get Directions
                                                </Link>
                                                <div className="dealer">{physicalData.ownership}</div>
                                            </div>
                                        </div>
                                    </>
                                );
                            }
                        )}
                        </div>  }
                        
                        
                    </div>
                    { storeData &&
                    <div className='mapContainer' id='mapContainer'>
                        <WrappedMap
                            googleMapURL = {`https://maps.googleapis.com/maps/api/js?key=AIzaSyCqIhTMIITk2PXT2iuvgFNzuUGB7vQG4-M&callback=initMap`}
                            loadingElement = {<div style = {{height: '100%'}} />}
                            containerElement={<div style = {{height: '100%'}}/>}
                            mapElement={<div style = {{height: '100%'}}/>}
                            markers={places}
                        />
                        {/* <MapData storeData={this.state.storeData}/> */}
                    </div> 
                    }                   
                </div>
                }
            </Fragment>
		);
	}
}

export default StoreLocator;