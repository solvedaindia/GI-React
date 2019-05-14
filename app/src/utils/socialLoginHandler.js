import axios from 'axios';
import {
  socialLoginAPI,
  accessToken,
  storeId,
  accessTokenCookie,
} from '../../public/constants/constants';
import appCookie from './cookie';


export function onFacebookResponse(socialData, callback) {
  console.log('Facebook---', socialData);
  socialLoginAPIHandler(socialData, callback);
}

export function onGoogleResponse(socialData, callback) {
  socialLoginAPIHandler(socialData, callback);
}

function socialLoginAPIHandler(socialData, callback) {
  const data = {
    first_name: socialData.firstName,
    last_name: socialData.lastName,
    authorization_provider: socialData.authorizationProvider,
    user_id: socialData.userId,
    social_token: socialData.socialToken,
    email_id: socialData.emialId,
  };

  axios
    .post(socialLoginAPI, data, {
      headers: { store_id: storeId, access_token: accessToken },
    })
    .then(response => {
      appCookie.set('isLoggedIn', true, 365 * 24 * 60 * 60 * 1000);
      appCookie.set(`${accessTokenCookie}=${response.data.data.access_token};path=/;expires=''`);
      window.location.reload();
      callback('Success');
      console.log('socialData---', response.data.data.access_token);
    })
    .catch(error => {
      callback('Error');
      console.log('socialerrr0r---', error);
    });
}
