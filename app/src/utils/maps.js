import apiManager from './apiManager';
import storage from './localStorage';
import { pinCodeCoordinatesAPI } from '../../public/constants/constants';
import { validatePindcode } from './validationManager';
const pincodeToLatLngCookieName = 'pincodeToLatLng';

export const setCoordinates = (pincode, lat, lng) => {
  if (pincode && lat && lng) {
    const pincodeToLatLngCookie =
      JSON.parse(storage.get(pincodeToLatLngCookieName)) || {};
    pincodeToLatLngCookie[pincode] = {
      lat,
      lng,
    };
    storage.set(
      pincodeToLatLngCookieName,
      JSON.stringify(pincodeToLatLngCookie),
    );
  }
};

export const getCoordinates = (pincode, callback) => {
  let coordinates = {};
  if (pincode) {
    const pincodeToLatLngCookie =
      JSON.parse(storage.get(pincodeToLatLngCookieName)) || {};
    if (
      pincodeToLatLngCookie[pincode] &&
      pincodeToLatLngCookie[pincode].lat &&
      pincodeToLatLngCookie[pincode].lng
    ) {
      coordinates.lat = pincodeToLatLngCookie[pincode].lat;
      coordinates.lng = pincodeToLatLngCookie[pincode].lng;
      callback(coordinates);
    } else if (pincode && !validatePindcode(pincode)) {
      callback(null);
    } else {
      apiManager
        .get(pinCodeCoordinatesAPI + pincode)
        .then(response => {
          const { latitude, longitude } = response.data.data;
          if (latitude && latitude !== '' && longitude && longitude !== '') {
            coordinates.lat = latitude;
            coordinates.lng = longitude;
            setCoordinates(pincode, latitude, longitude);
          } else {
            coordinates = null;
          }
          callback(coordinates);
        })
        .catch(() => {
          coordinates = null;
          callback(coordinates);
        });
    }
  } else {
    callback(null);
  }
};
