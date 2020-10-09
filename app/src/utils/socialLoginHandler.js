import apiManager from './apiManager';
import {
  socialLoginAPI,
  accessToken,
  storeId,
  accessTokenCookie,
} from '../../public/constants/constants';
import appCookie from './cookie';

export function onFacebookResponse(socialData, callback) {
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

  apiManager
    .post(socialLoginAPI, data)
    .then(response => {
      appCookie.set('isLoggedIn', true, 365 * 24 * 60 * 60 * 1000);
    //   appCookie.set(
    //     `${accessTokenCookie}=${
    //       response.data.data.access_token
    //     };path=/;expires=''`,
    //   );
	  
	  //  appCookie.set(
    //     `userID=${
    //       response.data.data.userID
    //     };path=/;expires=''`,
    //   );
    appCookie.set(accessTokenCookie, response.data.data.access_token, 365 * 24 * 60 * 60 * 1000);
    appCookie.set('userID', response.data.data.userID, 365 * 24 * 60 * 60 * 1000);
      window.location.reload();
      callback('Success');
    })
    .catch(error => {
      callback('Error');
    });
}
