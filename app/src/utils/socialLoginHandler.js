import {socialLoginAPI, accessToken, storeId} from '../../public/constants/constants'
import axios from 'axios';

export function onFacebookResponse(socialData, callback) {
    console.log('Facebook---',socialData);
    socialLoginAPIHandler(socialData, callback);
}

export function onGoogleResponse(socialData, callback) {
    socialLoginAPIHandler(socialData, callback);
}
  
function socialLoginAPIHandler (socialData, callback) {
    let data = {
        'first_name': socialData.firstName,
        'last_name': socialData.lastName,
        'authorization_provider': socialData.authorizationProvider,
        'user_id': socialData.userId,
        'social_token': socialData.socialToken,
        'email_id': socialData.emialId
    }
    
    axios.post(socialLoginAPI, data, { 'headers': { 'store_id': storeId, 'access_token': accessToken } }).then(response => {
        callback('Success');
        console.log('socialData---', response.data.data.access_token);
    }).catch(error => {
        callback('Error');
        console.log('socialerrr0r---', error);
    });
}
