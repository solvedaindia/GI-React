import React, { Fragment } from 'react';
import apiManager from '../../utils/apiManager';
import { GoogleMap, Marker, withScriptjs, withGoogleMap, InfoWindow } from "react-google-maps";
import { Link } from 'react-router-dom';
import {
    storeAPI,
    storeCityAPI,
    storeById,
    mapKey
} from '../../../public/constants/constants';
import '../../../public/styles/store/locator.scss';
import Img1 from '../../../public/images/store/furniture-stores-black.png';
import Img2 from '../../../public/images/store/mattress-stores-grey.png';
import Img3 from '../../../public/images/store/kitchen-galleries-grey.png';
import Img4 from '../../../public/images/store/b-2-b-experience-stores-grey.png';
import orangeIcon from '../../../public/images/store/orangeIcon.svg';
import blueIcon from '../../../public/images/store/blueIcon.svg';
import phoneIcon from '../../../public/images/store/phoneIcon.svg';
import starIcon from '../../../public/images/store/starIcon.svg';

import Geocode from "react-geocode";

const NUMB_REG = /^\d+$/;

class StoreLocator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            storeData: null,
            isLoading: true,
            testLat: '13.10127',
            testLong: '80.2873',
            error: null,
            searchStoreType: null,
            allstoreData: null,
            isOpen: false,
            Infokey: null,        
        };
        
    }

    handleToggleOpen = (index) => {

        this.setState({
            isOpen: true,
            Infokey: index
        });
    }

    handleStoreType(storeType, id) {
        let filterArr = new Array;
        let obj;
        let activeFilter = document.getElementsByClassName("active");
        while (activeFilter.length)
        activeFilter[0].classList.remove("active");        
        document.getElementById(id).classList.add("active");


        for(let i = 0; i < this.state.allstoreData.data.length; i++) {
            if (this.state.allstoreData.data[i].type.indexOf(storeType) !== -1) {
                filterArr.push(this.state.allstoreData.data[i]);
            }
            
        }
        
        if (filterArr.length > 0) {
            obj= {'data': filterArr};
        }
         
        this.setState({
            storeData: obj,
            isLoading: false,
            searchStoreType: 'filter',
        });
    }

    handleStoreSearch() {
        if(this.inputRef) {
            var val = this.inputRef.value;
            if(!val) return;
            if(NUMB_REG.test(val)) {
                this.getLatAndLong(val);
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
            this.setState({
                storeData: response.data,
                allstoreData: response.data,
                isLoading: false,

            })
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
            this.setState({
                storeData: response.data,
                allstoreData: response.data,
                isLoading: false
            })
           
        })
        .catch(error => {
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


    getStoreDataByPincode(lat, lng) {
        this.getStoreData(lat, lng);
    }

    getLatAndLong(getdata) {
        Geocode.setApiKey(mapKey);
        Geocode.fromAddress(getdata).then(
            response => { 
            const { lat, lng } = response.results[0].geometry.location;
            this.getStoreData(lat, lng);
            },
            error => { 
                this.getStoreData(this.state.testLat, this.state.testLong);
            console.log('Error=>>###', error);
            }
        );
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.location.state) {
            if (nextProps.location.state.storeName !== this.props.location.state.storeName) {
                this.getSToreDataByCity(nextProps.location.state.storeName);
            } 
            window.scrollTo(0, 0);
        }
    }
    
	componentDidMount() { 
        if (this.props.location.state) {
            if (this.props.location.state.storeId) { 
                this.getSToreDataById(this.props.location.state.storeId);
            } else if (this.props.location.state.storeName){ 
                this.getSToreDataByCity(this.props.location.state.storeName);
            } else if (this.props.location.state.pincode) {
                this.getLatAndLong(this.props.location.state.pincode);
            }
        }
        window.scrollTo(0, 0);
    }

    createMap(storeData) {

        return (
            <GoogleMap
                defaultZoom={10}
                defaultCenter={{lat: parseFloat(storeData[0].latitude), lng: parseFloat(storeData[0].longitude)}}  
            >
            {/* <MarkerData storeData={storeData} /> */}
            {
                storeData.map((item, index) => {
                    let iconType = orangeIcon;
                    if(item.ownership === 'Godrej Interio Store') {
                        iconType = blueIcon;
                    }
                    
                    return(
                        <>
                            <Marker 
                                key={index} onClick={() => this.handleToggleOpen(index)} 
                                position={{lat: parseFloat(item.latitude), lng: parseFloat(item.longitude)}} 
                                icon={{
                                    url: iconType,
                                }} >
                                { this.state.Infokey === index && this.state.isOpen &&
                                <InfoWindow onCloseClick={() => this.handleToggleClose}>
                                    <div>
                                        <h4>{item.storeName}</h4>
{/*                         
                                        <p>
                                        98G Albe Dr Newark, DE 19702 <br />
                                        302-293-8627
                                        </p> */}
                                    </div>
                                </InfoWindow>
                            }
                        
                            </Marker>
                        </>
                    )
                })
            }
            </GoogleMap>
        );
    }

	render() { 
        
        const { storeData, searchStoreType } = this.state;
        let WrappedMap;
        let showFilter = false;
        if (storeData) {
             WrappedMap = withScriptjs(withGoogleMap(this.createMap.bind(this, storeData.data)));
             showFilter = true;
        } else if (searchStoreType === 'filter') {
            showFilter = true;
        }

		return (
            <Fragment>
                <div className='storeLocator'>
                    <h1 className='title'>Find your closest store</h1>
                    <div className='field'>
                        <input type='text' className='pc-field' ref={(ref)=> {this.inputRef=ref}}/>
                        <button type="button" className='pc-btn' onClick={this.handleStoreSearch.bind(this)}>Find Stores</button>
                    </div>

                    { showFilter &&
                    
                    <div className='storeTypes'>
                        <ul className='typeList'>
                            <li className='storeTypeItem' id='home' onClick={this.handleStoreType.bind(this,'Home Furniture Stores', 'home')}>
                                <figure className='typeList'><img src={Img1} className='storeImg'/></figure>
                                <figcaption className="storetext">
                                    Home Furniture Stores
                                </figcaption>
                            </li>
                            <li className='storeTypeItem' id='mattress' onClick={this.handleStoreType.bind(this,'Mattress Stores', 'mattress')}>
                                <figure className='typeList' ><img src={Img2} className='storeImg'/>
                                    
                                </figure>
                                <figcaption className="storetext">
                                    Mattress Stores
                                </figcaption>
                            </li>
                            <li className='storeTypeItem' id='kitchen' onClick={this.handleStoreType.bind(this,'Kitchen Gallery', 'kitchen')}>
                                <figure className='typeList'><img src={Img3} className='storeImg'/>
                                </figure>
                                <figcaption className="storetext">
                                    Kitchen Galleries
                                </figcaption>
                            </li>
                            <li className='storeTypeItem' id='b2b' onClick={this.handleStoreType.bind(this,'B2B Experience Stores', 'b2b')}>
                                <figure className='typeList'><img src={Img4} className='storeImg'/>
                                </figure>
                                <figcaption className="storetext">
                                    B2B Experience Stores
                                </figcaption>
                            </li>
                        </ul>
                    </div>
                    }
                    { !storeData &&
                    <div className='storeTypes'>
                        <h2>No stores within this {this.state.searchStoreType}</h2>
                        <>
                        { !showFilter &&
                        <span>Please try another city or pincode</span>
                        }
                        </>
                    </div>
                    }
                </div>
                
                <div className="clearfix"></div>
                { storeData &&                
                <div className="storeDetails clearfix">
                
                    <h1 className='headingtitle'>One stop destination for your furniture</h1>
                    <div className='storeList'>
                        
                        {<div className='detailCard' id='detailCardSection'>
                            {!!storeData && storeData.data.map((physicalData) => {
                                return(
                                    <>
                                        <div className='storeListItem'>
                                            { physicalData.ribbonText &&
                                            <div className="modular_wardrobe">
                                                <img className='icons' src={starIcon} alt="star"/>
                                                <div className='ribbonText'>{physicalData.ribbonText}</div>
                                            </div>
                                            }
                                            <div className="Storewrapper">
                                             <h2 className="storeName">{physicalData.storeName}</h2>
                                             {/* <div className="distance">2.5 km </div> */}
                                            </div>
                                            
                                            <p>{physicalData.address1} {physicalData.address2} {physicalData.address3}, {physicalData.city} - {physicalData.pinCode}</p>
                                            <div className="phoneDetails">
                                              <img className="phoneicon" src={phoneIcon} alt="phone"/>
                                              <div className="PhoneNo">{physicalData.telephone}</div>
                                              </div>
                                            <div className="direction_dealerwrp">
                                                <Link className="getDirection" target='_blank' to={{ pathname: '/direction', state: { latAndLng: 'getLatAndLong' } }}>
                                                    Get Directions
                                                </Link>
                                                <div className="dealer">
                                                  <div className="dealertext"><img className="mapicon" src={orangeIcon} alt="map"/>{physicalData.ownership}</div>
                                                  </div>
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
                            googleMapURL = {`https://maps.googleapis.com/maps/api/js?key=${mapKey}`}
                            loadingElement = {<div style = {{height: '100%'}} />}
                            containerElement={<div style = {{height: '100%'}}/>}
                            mapElement={<div style = {{height: '100%'}}/>}
                        />
                    </div> 
                    }                   
                </div>
                }
            </Fragment>
		);
	}
}

export default StoreLocator;