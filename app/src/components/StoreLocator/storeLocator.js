import React, { Fragment } from 'react';
import apiManager from '../../utils/apiManager';
import { GoogleMap, Marker, withScriptjs, withGoogleMap } from "react-google-maps";
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { storeAPI, storeCityAPI, storeById, mapKey } from '../../../public/constants/constants';
import '../../../public/styles/store/locator.scss';
import Img1 from '../../../public/images/store/furniture-stores-black.png';
import Img2 from '../../../public/images/store/mattress-stores-grey.png';
import Img3 from '../../../public/images/store/kitchen-galleries-grey.png';
import Img4 from '../../../public/images/store/b-2-b-experience-stores-grey.png';
import orangeIcon from '../../../public/images/store/orangeIcon.svg';
import blueIcon from '../../../public/images/store/blueIcon.svg';
import phoneIcon from '../../../public/images/store/phoneIcon.svg';
import starIcon from '../../../public/images/store/starIcon.svg';
import appCookie from '../../utils/cookie';
import Geocode from "react-geocode";
import {isMobile} from '../../utils/utilityManager';
const NUMB_REG = /^\d+$/;
const prevArrowImg = (
    <img src={require('../SVGs/carousel__arrowLeft.svg')} />
  );
  const nextArrowImg = (
    <img src={require('../SVGs/carousel__arrowRight.svg')} />
  );
class StoreLocator extends React.Component {
    constructor(props) {
        super();
        super(props);
        this.state = {
            storeData: null,
            isLoading: true,
            defaultLat: '',
            defaultLng: '',
            isError: false,
            searchStoreType: null,
            allstoreData: null,
            isOpen: false,
            Infokey: null,        
        };

        this.settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 4,
            arrows: true,
            prevArrow: prevArrowImg,
            nextArrow: nextArrowImg,
            // prevArrow,
            // nextArrow,
            responsive: [
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 3,
                  infinite: true,
                  dots: true,
                },
              },
              {
                breakpoint: 600,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 2,
                  initialSlide: 2,
                  dots: true,
                  prevArrow: false,
                  nextArrow: false,
                },
              },
              {
                breakpoint: 480,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  dots: true,
                  prevArrow: false,
                  nextArrow: false,
                },
              },
            ],
          };        
    }

    componentDidMount() { 
        if (this.props.history.location.state) {
            console.log('props', this.props.history.location.state);
            if (this.props.history.location.state.storeName){ 
                this.getLatAndLong(this.props.history.location.state.storeName);
            } else if (this.props.history.location.state.pincode) {
                this.getLatAndLong(this.props.history.location.state.pincode);
            } else {
                this.getLatAndLong(appCookie.get('pincode'));
            }
        }
        window.scrollTo(0, 0);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.history.location.state) {
            if (nextProps.history.location.state.storeName){ 
                this.getLatAndLong(nextProps.history.location.state.storeName);
            } else if (nextProps.history.location.state.pincode) {
                this.getLatAndLong(nextProps.history.location.state.pincode);
            } else {
                this.getLatAndLong(appCookie.get('pincode'));
            }
            this.removeActiveClassFromFilter();
            window.scrollTo(0, 0);
        }
    }

    /* handle toggle */
    handleToggleOpen = (index) => {
        this.setState({
            isOpen: true,
            Infokey: index
        });
    }

    /* remove active class from filter */
    removeActiveClassFromFilter() {
        let activeFilter = document.getElementsByClassName("active");
        while (activeFilter.length)
        activeFilter[0].classList.remove("active");
    }

    /* handle store type filter */
    handleStoreType(storeType, id) {
        let filterArr = new Array;
        let obj;
        this.removeActiveClassFromFilter();
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

    /* handle store search */
    handleStoreSearch() {
        this.removeActiveClassFromFilter();
        if(this.inputRef) {
            const val = this.inputRef.value;
            if(!val) return;
            if(NUMB_REG.test(val)) {
                this.props.history.push({
                    state: { pincode: val }
                })
            } else {
                this.props.history.push({
                    state: { storeName: val }
                })
            }
            this.getLatAndLong(val);
        }
    }
    
    /* get data from pincode */
    getStoreDataFromPincode(lat, lng) { 
        const data = {
            params: {
                latitude: lat,
                longitude: lng
            },
        };
        let output = null
          
        apiManager.get(`${storeAPI}`, data).then( response => {
            if (response.data.data.length > 0) {
                output = response.data;
            }

            this.setState({
                storeData: output,
                allstoreData: output,
                isLoading: false,
                searchStoreType: 'pincode',
                defaultLat: lat,
                defaultLng: lng,
                isOpen: false,
                isError: false
            });
        }).catch(error => {
            console.log('Error=>', error.response);
            this.setState({
                storeData: null,
                isError: true,
                isLoading: false,
                isError: true
            });
        });
    }

    /* get data from city name */
    getSToreDataByCity(latVal, lngVal, city) {
        const data = {
            params: {
                cityname: city,
            },
        };
        apiManager.get(`${storeCityAPI}`, data).then( response => {
            this.setState({
                storeData: response.data,
                allstoreData: response.data,
                isLoading: false,
                defaultLat: latVal,
                defaultLng: lngVal,
                isOpen: false,
                isError: false
            })
           
        })
        .catch(error => {
            console.log('Error=>', error.response);
            this.setState({
                storeData: null,
                isLoading: false,
                searchStoreType: 'city',
                isError: true
            });
        });
    }

    /* get data from store id */
    getSToreDataById(latVal, lngVal, id) {
        let storeId = '';
        for(let i = 0 ; i < id.length; i++) {
            if (i === 0) {
                storeId += `?physicalStoreId=${id[i]}`;
            } else {
                storeId += `&physicalStoreId=${id[i]}`;
            }
        }

        apiManager.get(`${storeById+storeId}`).then( response => {
            this.setState({
                storeData: response.data,
                allstoreData: response.data,
                isLoading: false,
                defaultLat: latVal,
                defaultLng: lngVal,
                isOpen: false,
                isError: false
            })
        }).catch(error => {
            console.log('Error=>', error.response)
            this.setState({
                storeData: null,
                isLoading: false,
                searchStoreType: 'storeId',
                isError: true
            });
        });
    }

    /* get lat and long */
    getLatAndLong(getdata) { 
        Geocode.setApiKey(mapKey);
        Geocode.fromAddress(getdata).then(response => { 
            const { lat, lng } = response.results[0].geometry.location;
            
            if (this.props.history.location.state.storeName){ 
                this.getSToreDataByCity(lat, lng, getdata);
            } else if (this.props.history.location.state.storeId) {
                this.getSToreDataById(lat, lng, this.props.history.location.state.storeId);
            } else {
                this.getStoreDataFromPincode(lat, lng);
            }
        },error => { 
                console.log('Error=>>', error);
                this.setState({
                    storeData: null,
                    isLoading: false,
                    searchStoreType: '',
                    isError: true
                });
                
            }
        );
    }

    /* create Map */
    createMap(storeData) {
        return (
            <GoogleMap
                defaultZoom={10}
                defaultCenter={{lat: parseFloat(this.state.defaultLat), lng: parseFloat(this.state.defaultLng)}}  
            >
                {storeData.map((item, index) => {
                    let iconType = orangeIcon;
                    if(item.ownership === 'Godrej Interio Store') {
                        iconType = blueIcon;
                    }
                    return(
                        <div key={index}>
                            <Marker
                                // onClick={() => this.handleToggleOpen(index)} 
                                position={{lat: parseFloat(item.latitude), lng: parseFloat(item.longitude)}} 
                                icon={{
                                    url: iconType,
                                }}
                            >
                                {/* { this.state.Infokey === index && this.state.isOpen &&
                                    <InfoWindow onCloseClick={() => this.handleToggleClose}>
                                        <div>
                                            <h4>{item.storeName}</h4>
                                        </div>
                                    </InfoWindow>
                                } */}
                            </Marker>
                        </div>
                    )
                })
                }
            </GoogleMap>
        );
    }

    /* get radius */
    toRadius(Value) {
        return Value * Math.PI / 180;
    }

    /* get distance from lat and long */
    getDistance(lat1, lon1, lat2, lon2) {
        const inKm = 6371; // km
        const dLat = this.toRadius(lat2-lat1);
        const dLon = this.toRadius(lon2-lon1);
        const getLat1 = this.toRadius(lat1);
        const getLat2 = this.toRadius(lat2);

        let getValueInKm = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(getLat1) * Math.cos(getLat2); 
        getValueInKm = 2 * Math.atan2(Math.sqrt(getValueInKm), Math.sqrt(1-getValueInKm)); 
        getValueInKm = inKm * getValueInKm;
        return getValueInKm.toFixed(1);
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
                        <button type="button" className='pc-btn' onClick={this.handleStoreSearch.bind(this)}>{!isMobile() ? 'Find Stores':'Find'}</button>
                    </div>

                    { showFilter &&
                        <div className='storeTypes'>
                             {isMobile() ? (<h1 className='headingtitle'>Choose store type</h1>):''}
                            <ul className='typeList'>
                                <li className='storeTypeItem' id='home' onClick={this.handleStoreType.bind(this,'Home Furniture Stores', 'home')}>
                                    <figure className='typeList'><img src={Img1} className='storeImg'/></figure>
                                    <figcaption className="storetext">
                                        Home Furniture Stores
                                    </figcaption>
                                </li>
                                <li className='storeTypeItem' id='mattress' onClick={this.handleStoreType.bind(this,'Mattress Stores', 'mattress')}>
                                    <figure className='typeList' ><img src={Img2} className='storeImg'/></figure>
                                    <figcaption className="storetext">
                                        Mattress Stores
                                    </figcaption>
                                </li>
                                <li className='storeTypeItem' id='kitchen' onClick={this.handleStoreType.bind(this,'Kitchen Gallery', 'kitchen')}>
                                    <figure className='typeList'><img src={Img3} className='storeImg'/></figure>
                                    <figcaption className="storetext">
                                        Kitchen Galleries
                                    </figcaption>
                                </li>
                                <li className='storeTypeItem' id='b2b' onClick={this.handleStoreType.bind(this,'B2B Experience Stores', 'b2b')}>
                                    <figure className='typeList'><img src={Img4} className='storeImg'/></figure>
                                    <figcaption className="storetext">
                                        B2B Experience Stores
                                    </figcaption>
                                </li>
                            </ul>
                        </div>
                    }
                    { !storeData &&
                    <div className='storeTypes'>
                        <h2 className='headingtitle'>No stores within this {this.state.searchStoreType}</h2>
                        <>
                            { !showFilter &&
                                <span>Please try another city or pincode<br/><br/></span>
                            }
                        </>
                    </div>
                    }
                </div>
                
                <div className="clearfix"></div>
                    { storeData &&                
                        <div className="storeDetails clearfix">
                            {!isMobile() ? (<h1 className='headingtitle'>One stop destination for your furniture</h1>):''}
                            <div className='storeList'>
                            {isMobile() ? (<h1 className='headingtitle'>One stop destination for your furniture</h1>):''}
                                {<div className='detailCard' id='detailCardSection'>
                                    {!!storeData && storeData.data.map((physicalData, index) => {
                                        const data = this.getDistance(this.state.defaultLat, this.state.defaultLng, physicalData.latitude, physicalData.longitude);
                                        let ribbonClass = '';
                                        if (physicalData.ribbonText) {
                                            ribbonClass = 'ribbon';
                                        }
                                        return(
                                            <div key={index}>
                                                 {!isMobile() ? (<div className={`storeListItem ${ribbonClass}`}>
                                                    { physicalData.ribbonText &&
                                                    <div className="modular_wardrobe">
                                                        <img className='icons' src={starIcon} alt="star"/>
                                                        <div className='ribbonText'>{physicalData.ribbonText}</div>
                                                    </div>
                                                    }
                                                    <div className="Storewrapper">
                                                        <h2 className="storeName">{physicalData.storeName}</h2>
                                                        { this.props.history.location.state.pincode && 
                                                        <>
                                                            <div className="distance">{data} Km</div>
                                                        </>
                                                        }
                                                    </div>
                                                    <p>{physicalData.address1} {physicalData.address2} {physicalData.address3}, {physicalData.city} - {physicalData.pinCode}</p>
                                                    <div className="phoneDetails">
                                                        <img className="phoneicon" src={phoneIcon} alt="phone"/>
                                                        <div className="PhoneNo">{physicalData.telephone}</div>
                                                    </div>
                                                    <div className="direction_dealerwrp">
                                                        <Link to={{ pathname: `https://www.google.com/maps/dir/${this.state.defaultLat},${this.state.defaultLng}/${physicalData.latitude},${physicalData.longitude}`}} className="getDirection" target='_blank'>
                                                            Get Directions
                                                        </Link>
                                                        {/* <Link to={{ pathname: `/direction/${this.state.defaultLat}/${this.state.defaultLng}/${physicalData.latitude}/${physicalData.longitude}`}} className="getDirection" target='_blank'>
                                                            Get Directions
                                                        </Link> */}
                                                        <div className="dealer">
                                                            <div className="dealertext"><img className="mapicon" src={orangeIcon} alt="map"/>{physicalData.ownership}</div>
                                                        </div>
                                                    </div>
                                                    </div>):
                                                    (<Slider {...this.settings}><div className={`storeListItem ${ribbonClass}`}>
                                                    { physicalData.ribbonText &&
                                                    <div className="modular_wardrobe">
                                                        <img className='icons' src={starIcon} alt="star"/>
                                                        <div className='ribbonText'>{physicalData.ribbonText}</div>
                                                    </div>
                                                    }
                                                    <div className="Storewrapper">
                                                        <h2 className="storeName">{physicalData.storeName}</h2>
                                                        { this.props.history.location.state.pincode && 
                                                        <>
                                                            <div className="distance">{data} Km</div>
                                                        </>
                                                        }
                                                    </div>
                                                    <p className='store-detal-desc'>{physicalData.address1} {physicalData.address2} {physicalData.address3}, {physicalData.city} - {physicalData.pinCode}</p>
                                                    <div className="phoneDetails">
                                                        <img className="phoneicon" src={phoneIcon} alt="phone"/>
                                                        <div className="PhoneNo">{physicalData.telephone}</div>
                                                    </div>
                                                    <div className="direction_dealerwrp">
                                                        <Link to={{ pathname: `/direction/${this.state.defaultLat}/${this.state.defaultLng}/${physicalData.latitude}/${physicalData.longitude}`}} className="getDirection" target='_blank'>
                                                            Get Directions
                                                        </Link>
                                                        <div className="dealer">
                                                            <div className="dealertext"><img className="mapicon" src={orangeIcon} alt="map"/>{physicalData.ownership}</div>
                                                        </div>
                                                    </div>
                                                    </div></Slider>)}
                                            </div>
                                        );
                                    }
                                )}
                            </div>
                        }
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