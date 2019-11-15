import apiManager from '../../utils/apiManager';
import {cartDetailAPI} from '../../../public/constants/constants';
import * as actionTypes from '../../constants/app/constants';

export function getCartDetails(){
    return {
        type: actionTypes.GET_CART_REQUESTED
    }
}
