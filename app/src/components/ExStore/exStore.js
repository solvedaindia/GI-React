import React from 'react';
import Geocode from 'react-geocode';
import { mapKey } from '../../../public/constants/constants';
import appCookie from '../../utils/cookie';
import '../../../public/styles/store/store.scss';
import StoreDetails from './storeDetails';
import { getCoordinates, setCoordinates } from '../../utils/maps';

export class ExStore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      storeData: null,
      long: null,
      lat: null,
      isLoading: true,
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
          isLoading: false,
        });
      } else {
        Geocode.setApiKey(mapKey);
        Geocode.fromAddress(pinCode)
          .then(response => {
            const { lat, lng } = response.results[0].geometry.location;
            setCoordinates(pinCode, lat, lng);
            this.setState({
              lat: lat,
              long: lng,
              isLoading: false,
            });
          })
          .catch(error => {
            this.setState({
              error,
              isLoading: false,
            });
          });
      }
    });
  }

  componentDidMount() {
    this.getLatAndLong(appCookie.get('pincode'));
  }

  render() {
    if (this.state.isLoading) {
      return <></>;
    }
    const { lat, long } = this.state;
    if (lat && long) {
      return <StoreDetails longitude={long} latitude={lat} />;
    }
    return '';
  }
}

export default ExStore;
