import axios from 'axios';
import {
  storeId,
  accessToken,
  accessTokenCookie,
} from '../../public/constants/constants';
import { getCookie } from './utilityManager';
import { resetTheCookiesAndData } from './initialManager';
const isTokenExpire = false;

const getClient = (baseUrl = null) => {
  const options = {
    baseURL: baseUrl,
    headers: {
      access_token: accessToken,
      store_id: storeId,
    },
  };

  const client = axios.create(options);
  // Add a request interceptor
  client.interceptors.request.use(
    requestConfig => requestConfig,
    requestError => {
      Raven.captureException(requestError);
      return Promise.reject(requestError);
    },
  );

  // Add a response interceptor
  client.interceptors.response.use(
    response => response,
    error => {
      console.log('the Error --- ', error.response);
      // if (error.response.status >= 500) {
      //   //Raven.captureException(error);
      // }
      if (error.response.data.error.error_key === 'token_expired') {
        // theCount += 1;
        // isTokenExpire = true;
        console.log('THIS THE COUNT ---- ', isTokenExpire);
        expireAccessTokenHandling();
      }
      // else if (error.response.data.error.error_key === 'wcs_invalid_response') {
      //   console.log('WXS down');
      //   alert(error.response.data.error.error_message);
      // }
      return Promise.reject(error);
    },
  );

  return client;
};

/**
 * Base HTTP Client
 */
export default {
  // Provide request methods with the default base_url
  get(url, conf = {}) {
    return getClient()
      .get(url, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },

  delete(url, conf = {}) {
    return getClient()
      .delete(url, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },

  head(url, conf = {}) {
    return getClient()
      .head(url, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },

  options(url, conf = {}) {
    return getClient()
      .options(url, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },

  post(url, data = {}, conf = {}) {
    console.log('POST DATA -- ', data, url);
    return getClient()
      .post(url, data, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },

  put(url, data = {}, conf = {}) {
    return getClient()
      .put(url, data, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },

  patch(url, data = {}, conf = {}) {
    return getClient()
      .patch(url, data, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },
};

export function expireAccessTokenHandling() {
  if (getCookie(accessTokenCookie) != '') {
    console.log('Token has expired', getCookie(accessTokenCookie));
    alert('Please relogin, your session has expired.');
    resetTheCookiesAndData();
  }
}
