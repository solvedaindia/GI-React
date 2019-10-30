import React, { Fragment } from 'react';
import apiManager from '../../utils/apiManager';
import { GoogleMap, Marker, withScriptjs, withGoogleMap, InfoWindow } from "react-google-maps";
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { storeAPI, storeCityAPI, storeById, mapKey, ipDataApi } from '../../../public/constants/constants';
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
import { isMobile } from '../../utils/utilityManager';
import { Helmet } from 'react-helmet'
import Pixels from '../../components/Primitives/pixels';
import ContentEspot from '../../components/Primitives/staticContent';


import { DIRECTIONS } from '../../constants/app/primitivesConstants';

// import Imgblack1 from '../../../public/images/store/kitchen-galleries-black.png';
const NUMB_REG = /^\d+$/;
const pageTitle = 'Experience our products first hand at your nearest Godrej Interio store';

const prevArrowImg = (
    <img src={require('../SVGs/carousel__arrowLeft.svg')} alt="Prev" />
);
const nextArrowImg = (
    <img src={require('../SVGs/carousel__arrowRight.svg')} alt="Next" />
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
            filteredSingleStore: null,
            currentLat: null,
            currentLong: null,
        };

        this.settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
            centerMode: true,
            centerPadding: '15px',
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
                        dots: true,
                    },
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        dots: false,
                        prevArrow: false,
                        nextArrow: false
                    },
                },
            ],
        };
    }

    componentDidMount() 
	{
        let pincodeVal =  appCookie.get('pincode');
        if (this.props.history.location.state) {
            if (this.props.history.location.state.storeName) {
                this.getLatAndLong(this.props.history.location.state.storeName);
                pincodeVal = this.props.history.location.state.storeName;
            } else {
                this.getLatAndLong(appCookie.get('pincode'));
                pincodeVal = appCookie.get('pincode');
            }
        }

        document.getElementById('city').value=pincodeVal;
        this.getUserCurrentLocation();
    }

    getUserCurrentLocation() {
        fetch(ipDataApi).then(res => {
            return res.json()
        }).then(res => {
            this.setState({
                currentLat: res.latitude,
                currentLong: res.longitude,
            })
        }).catch(error => {
            this.setState({
                currentLat: this.state.defaultLat,
                currentLong: this.state.defaultLng,
            })
        });
    }

    componentWillReceiveProps(nextProps) {
        let pincodeVal;
        if (this.props.history.location.state) {
            let storeNameInput = document.getElementById("city").value;
            if (nextProps.history.location.state.storeName) {
                this.getLatAndLong(nextProps.history.location.state.storeName);
                pincodeVal = this.props.history.location.state.storeName;
                if (storeNameInput != nextProps.history.location.state.storeName) {
                    document.getElementById("city").value = "";
                }
            } else if (nextProps.history.location.state.pincode) {
                if (storeNameInput != nextProps.history.location.state.pincode) {
                    document.getElementById("city").value = "";
                    this.getLatAndLong(appCookie.get('pincode'));
                    pincodeVal = appCookie.get('pincode');
                } else {
                    this.getLatAndLong(nextProps.history.location.state.pincode);
                    pincodeVal = this.props.history.location.state.pincode;
                }
            } else {
                if (storeNameInput != appCookie.get('pincode')) {
                    document.getElementById("city").value = "";
                }
                this.getLatAndLong(appCookie.get('pincode'));
                pincodeVal = appCookie.get('pincode');
            }
            document.getElementById('city').value=pincodeVal;
            this.removeActiveClassFromFilter();
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

        for (let i = 0; i < this.state.allstoreData.data.length; i++) {
            if (this.state.allstoreData.data[i].type.indexOf(storeType) !== -1) {
                filterArr.push(this.state.allstoreData.data[i]);
            }
        }
        
        if (filterArr.length > 0) {
            obj = { 'data': filterArr };
        }
        this.setState({
            storeData: obj,
            isLoading: false,
            searchStoreType: 'filter',
            filteredSingleStore: null,
            isOpen: false
        });
        
    }

    /* handle store search */
    handleStoreSearch() {
        this.removeActiveClassFromFilter();
        if (this.inputRef) {
            const val = this.inputRef.value;
            if (!val) return;
            if (NUMB_REG.test(val)) {
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

        apiManager.get(`${storeAPI}`, data).then(response => {
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
                isError: false,
                filteredSingleStore: null
            });
        }).catch(error => {
            this.setState({
                storeData: null,
                isError: true,
                searchStoreType: 'pincode',
                isLoading: false,
                isError: true,
                filteredSingleStore: null
            });
            this.inputRef.value = '';
        });
    }

    /* get data from city name */
    getSToreDataByCity(latVal, lngVal, city) {
        const data = {
            params: {
                cityname: city,
            },
        };
        apiManager.get(`${storeCityAPI}`, data).then(response => {
            this.setState({
                storeData: response.data,
                allstoreData: response.data,
                isLoading: false,
                defaultLat: latVal,
                defaultLng: lngVal,
                isOpen: false,
                isError: false,
                filteredSingleStore: null
            })

        })
            .catch(error => {
                this.setState({
                    storeData: null,
                    isLoading: false,
                    searchStoreType: 'city',
                    isError: true,
                    filteredSingleStore: null
                });

            });
    }

    /* get data from store id */
    getSToreDataById(latVal, lngVal, id) {
        let storeId = '';
        for (let i = 0; i < id.length; i++) {
            if (i === 0) {
                storeId += `?physicalStoreId=${id[i]}`;
            } else {
                storeId += `&physicalStoreId=${id[i]}`;
            }
        }

        apiManager.get(`${storeById + storeId}`).then(response => {
            this.setState({
                storeData: response.data,
                allstoreData: response.data,
                isLoading: false,
                defaultLat: latVal,
                defaultLng: lngVal,
                isOpen: false,
                isError: false,
                filteredSingleStore: null
            })
        }).catch(error => {
            this.setState({
                storeData: null,
                isLoading: false,
                searchStoreType: 'storeId',
                isError: true,
                filteredSingleStore: null
            });
        });
    }

    /* get lat and long */
    getLatAndLong(getdata) {
        Geocode.setApiKey(mapKey);
        Geocode.fromAddress(getdata).then(response => {
            const { lat, lng } = response.results[0].geometry.location;

            if (this.props.history.location.state.storeName) {
                this.getSToreDataByCity(lat, lng, getdata);
            } else if (this.props.history.location.state.storeId) {
                this.getSToreDataById(lat, lng, this.props.history.location.state.storeId);
            } else {
                this.getStoreDataFromPincode(lat, lng);
            }
        }, error => {
            let getStringVal = '';
            if (this.props.history.location.state.storeName) {
                getStringVal = 'city';
            } else if (this.props.history.location.state.storeId) {
                getStringVal = 'store';
            } else if (this.props.history.location.state.pincode) {
                getStringVal = 'pincode'
            }
            this.setState({
                storeData: null,
                isLoading: false,
                searchStoreType: getStringVal,
                isError: true,
                filteredSingleStore: null
            });

        }
        );
    }

    /* create Map */
    createMap(storeData) {
        const defaultMapOptions = {
            fullscreenControl: false,
        };
        return (
            <GoogleMap
                defaultZoom={10}
                defaultCenter={{ lat: parseFloat(this.state.defaultLat), lng: parseFloat(this.state.defaultLng) }}
                defaultOptions={defaultMapOptions}
            >
                {storeData.map((item, index) => {
                    const data = this.getDistance(this.state.defaultLat, this.state.defaultLng, item.latitude, item.longitude);
                    let iconType = orangeIcon;
                    if (item.storeName === 'Godrej Interio Store') {
                        iconType = blueIcon;
                    }
                    return (
                        
                        <div key={index}>
                            <Marker
                                onClick={() => this.handleToggleOpen(index)}
                                position={{ lat: parseFloat(item.latitude), lng: parseFloat(item.longitude) }}
                                icon={{
                                    url: iconType,
                                }}
                            >
                                {this.state.Infokey === index && this.state.isOpen &&
                                    <InfoWindow onCloseClick={() => this.handleToggleClose}>
                                        <div style={{margin: "10px"}}>
                                            <h4>{item.storeName}</h4>
                                            {this.props.history.location.state.pincode &&
                                                <p>{data} Km</p>
                                            }
											
											
                                            { 
											
											item.storeHours && item.storeHours.split('|')[0] && <p>{item.storeHours.split('|')[0]}</p>
																						
											}
											{ 
											
											item.storeHours && item.storeHours.split('|')[1] && <p>{item.storeHours.split('|')[1]}</p>
																						
											}
											
                                        </div>
                                    </InfoWindow>
                                }
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
        const dLat = this.toRadius(lat2 - lat1);
        const dLon = this.toRadius(lon2 - lon1);
        const getLat1 = this.toRadius(lat1);
        const getLat2 = this.toRadius(lat2);

        let getValueInKm = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(getLat1) * Math.cos(getLat2);
        getValueInKm = 2 * Math.atan2(Math.sqrt(getValueInKm), Math.sqrt(1 - getValueInKm));
        getValueInKm = inKm * getValueInKm;
        return getValueInKm.toFixed(1);
    }

    handleCliked(filterRecord) {
        this.setState({
            filteredSingleStore: filterRecord
        })
    }
    onKeyPress=(event)=>
    {
        if(event.key === 'Enter'){
        this.handleStoreSearch();
        }
    }

    render() {
        const { storeData, searchStoreType, filteredSingleStore } = this.state;
        let WrappedMap;
        let showFilter = false;
        let mapData;
        const mapArray = new Array();
        let pincodeValue;

        if (storeData) {
            mapData = storeData.data;
            if (filteredSingleStore !== null) {
                mapArray.push(filteredSingleStore);
                mapData = mapArray;
            } else {
                mapData = storeData.data;
            }
            WrappedMap = withScriptjs(withGoogleMap(this.createMap.bind(this, mapData)));
            showFilter = true;
        } else if (searchStoreType === 'filter') {
            showFilter = true;
        }

        return (
            <>
        <ContentEspot espotName = { 'GI_PIXEL_STORE_LOCATOR_BODY_START' } />
         <Fragment>
         <Helmet>
					<Pixels espotName= {'GI_PIXEL_STORE_LOCATOR_META'}/>
				</Helmet>
                <Helmet>
                    <title>{pageTitle}</title>
                </Helmet>
                <div className='storeLocator'>
                    <h1 className='title'>Find your closest store</h1>
                    <div className='field'>
                        <input id="city" type='text' onKeyPress={this.onKeyPress} name='locateStoreInput' className='pc-field' ref={(ref) => { this.inputRef = ref }}  />
                        <button type="button" id="locateStoreBtn" className='pc-btn' onClick={this.handleStoreSearch.bind(this)}>{!isMobile() ? 'Locate Stores' : 'Find'}</button>
                    </div>

                    {showFilter &&
                        <div className='storeTypes'>
                            {isMobile() ? (<h1 className='headingtitle'>Choose store type</h1>) : ''}
                            <ul className='typeList'>
                                <li className='storeTypeItem' id='home' onClick={this.handleStoreType.bind(this, 'Home Furniture', 'home')}>
                                    <figure className='typeList'><img src={Img1} className='storeImg' alt='Store Information' alt='Store Information' /></figure>
                                    <figcaption className="storetext">
                                        Home Furniture
                                    </figcaption>
                                </li>
                                <li className='storeTypeItem' id='mattress' onClick={this.handleStoreType.bind(this, 'Mattress Store', 'mattress')}>
                                    <figure className='typeList' ><img src={Img2} className='storeImg' alt='Store Information' /></figure>
                                    <figcaption className="storetext">
                                        Mattresses
                                    </figcaption>
                                </li>
                                <li className='storeTypeItem' id='kitchen' onClick={this.handleStoreType.bind(this, 'Kitchen Gallery', 'kitchen')}>
                                    <figure className='typeList'><img src={Img3} className='storeImg grey' alt='Store Information' />
                                        {/* <img src={Imgblack1} className='storeImg black' alt='Store Information' alt='Store Information'/> */}
                                    </figure>
                                    <figcaption className="storetext">
                                        Kitchens
                                    </figcaption>
                                </li>
                                <li className='storeTypeItem' id='b2b' onClick={this.handleStoreType.bind(this, 'Business Furniture', 'b2b')}>
                                    <figure className='typeList'><img src={Img4} className='storeImg' alt='Store Information' /></figure>
                                    <figcaption className="storetext">
                                        Office/Business Furniture
                                    </figcaption>
                                </li>
                            </ul>
                        </div>
                    }
                    {!storeData &&
                        <div className='storeTypes'>
                            <h2 className='headingtitle'>There are currently no stores in this area.</h2>
                            <>
                                {!showFilter &&
                                    <div className="anotherCity">Please try another city or pincode</div>
                                }
                            </>
                        </div>
                    }
                </div>

                <div className="clearfix"></div>
                {storeData &&
                    <div className="storeDetails clearfix">
                        {!isMobile() ? (<h1 className='headingtitle'>One-stop destination for all your furniture needs</h1>) : ''}
                        <div className='storeList'>
                            {isMobile() ? (<h1 className='headingtitle'>One-stop destination for all your furniture needs</h1>) : ''}
                            {<div className='detailCard' id='detailCardSection'>
                                {!isMobile() ? (
                                    !!storeData && storeData.data.map((physicalData, index) => {
                                        const data = this.getDistance(this.state.defaultLat, this.state.defaultLng, physicalData.latitude, physicalData.longitude);
                                        let ribbonClass = '';
                                        if (physicalData.ribbonText) {
                                            ribbonClass = 'ribbon';
                                        }
										 let iconType = orangeIcon;
											if (physicalData.storeName === 'Godrej Interio Store') {
												iconType = blueIcon;
											}
                                        return (
                                            <>
                                                <div key={index}>
                                                    <div className={`storeListItem ${ribbonClass}`}>
                                                        {physicalData.ribbonText &&
                                                            <div className="modular_wardrobe">
                                                                <img className='icons' src={starIcon} alt="star" />
                                                                <div className='ribbonText'>{physicalData.ribbonText}</div>
                                                            </div>
                                                        }
                                                        <div className="Storewrapper">
                                                            <h2 className="storeName"><a className="link" onClick={() => this.handleCliked(physicalData)}>{physicalData.storeName}</a></h2>
                                                            {this.props.history.location.state.pincode &&
                                                                <>
                                                                    <div className="distance">{data} Km</div>
                                                                </>
                                                            }
                                                        </div>
                                                       <p className='store-detal-desc'>{physicalData.address1+', '}{physicalData.address2!='undefined'?physicalData.address2+', ':''}{physicalData.address3!=undefined?physicalData.address3+', ':''} {physicalData.city} - {physicalData.pinCode}</p>
                                                        <div className="phoneDetails">
                                                            <img className="phoneicon" src={phoneIcon} alt="phone" />
                                                            <div className="PhoneNo">{physicalData.telephone}</div>
                                                        </div>
                                                        <div className="direction_dealerwrp">
                                                            <Link to={{ pathname: `https://www.google.com/maps/dir/'${this.state.currentLat},${this.state.currentLong}'/'${physicalData.latitude},${physicalData.longitude}'` }} className="getDirection" target='_blank'>
                                                                {DIRECTIONS}
                                                            </Link>

                                                            <div className="dealer">
															<div className="dealertext"><img className="mapicon" src={iconType} alt="map" />{physicalData.ownership}</div>
                                                            </div>
                                                        </div>
                                                    </div></div>
                                            </>
                                        );
                                    }
                                    )

                                ) :
                                    (<Slider {...this.settings}>
                                        {!!storeData && storeData.data.map((physicalData, index) => {
                                            const data = this.getDistance(this.state.defaultLat, this.state.defaultLng, physicalData.latitude, physicalData.longitude);
                                            let ribbonClass = '';
                                            if (physicalData.ribbonText) {
                                                ribbonClass = 'ribbon';
                                            }
                                            let iconType = orangeIcon;
											if (physicalData.storeName === 'Godrej Interio Store') {
												iconType = blueIcon;
											}
                                            return (
                                                <>
                                                    <div key={index} className='store-list-item-box'>
                                                        <div className={`storeListItem ${ribbonClass}`}>
                                                            {physicalData.ribbonText &&
                                                                <div className="modular_wardrobe">
                                                                    <img className='icons' src={starIcon} alt="star" />
                                                                    <div className='ribbonText'>{physicalData.ribbonText}</div>
                                                                </div>
                                                            }
                                                            <div className="Storewrapper">
                                                                <h2 className="storeName"><a className="link" onClick={() => this.handleCliked(physicalData)}>{physicalData.storeName}</a></h2>
                                                                {this.props.history.location.state.pincode &&
                                                                    <>
                                                                        <div className="distance">{data} Km</div>
                                                                    </>
                                                                }
                                                            </div>
                                                            <p className='store-detal-desc'>{physicalData.address1+', '}{physicalData.address2!='undefined'?physicalData.address2+', ':''}{physicalData.address3!=undefined?physicalData.address3+', ':''} {physicalData.city} - {physicalData.pinCode}</p>
                                                            <div className="phoneDetails">
                                                                <img className="phoneicon" src={phoneIcon} alt="phone" />
                                                                <div className="PhoneNo">{physicalData.telephone}</div>
                                                            </div>
                                                            <div className="direction_dealerwrp">
                                                                <Link to={{ pathname: `https://www.google.com/maps/dir/'${this.state.defaultLat},${this.state.defaultLng}'/'${physicalData.latitude},${physicalData.longitude}'` }} className="getDirection" target='_blank'>
                                                                    {DIRECTIONS}
                                                                </Link>

                                                                <div className="dealer">
                                                                    <div className="dealertext"><img className="mapicon" src={iconType} alt="map" />{physicalData.ownership}</div>
                                                                </div>
                                                            </div>
                                                        </div></div>
                                                </>
                                            );
                                        }
                                        )}

                                    </Slider>)}

                            </div>
                            }
                        </div>
                        {storeData &&
                            <div className='mapContainer' id='mapContainer'>
                                <WrappedMap
                                    googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${mapKey}`}
                                    loadingElement={<div style={{ height: '100%' }} />}
                                    containerElement={<div style={{ height: '100%' }} />}
                                    mapElement={<div style={{ height: '100%' }} />}
                                />
                            </div>
                        }
                    </div>
                }
            </Fragment>
            <ContentEspot espotName = { 'GI_PIXEL_STORE_LOCATOR_BODY_END' } />

            </>
		);
	}
}

export default StoreLocator;