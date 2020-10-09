import React from 'react';
import apiManager from '../../utils/apiManager';
import {
  storeAPI,
  imagePrefix,
  mapKey
} from '../../../public/constants/constants';
import { isMobile } from '../../utils/utilityManager';
import '../../../public/styles/store/store.scss';
import Geocode from 'react-geocode';
import appCookie from '../../utils/cookie';
import StoreDetails from '../ExStore/storeDetails';
import { getCoordinates, setCoordinates } from '../../utils/maps';

export class KitchenStore extends React.Component {
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
    getCoordinates(pinCode, coordinates => {
      const pincodeLatLng = coordinates;
      if (pincodeLatLng && pincodeLatLng.lat && pincodeLatLng.lng) {
        this.setState({
          lat: pincodeLatLng.lat,
          long: pincodeLatLng.lng,
        });
      } else {
        Geocode.setApiKey(mapKey);
        Geocode.fromAddress(pinCode)
          .then(response => {
            const { lat, lng } = response.results[0].geometry.location;
            setCoordinates(pinCode, lat, lng);
            this.setState({
              lat,
              long: lng,
            });
          })
          .catch(error => {
            this.setState({
              error,
              isLoading: false
            });
          });
      }
    });
  }

  componentDidMount() {
    this.getLatAndLong(appCookie.get('pincode'));
  }

  render() {
    const { lat, long } = this.state;
    if (lat && long) {
      return <StoreDetails longitude={long} latitude={lat} />;
    }
    return '';
  }
}

export default KitchenStore;
