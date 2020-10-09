import { GET_CART_FETCHED } from '../../constants/app/constants';

function cartReducer(state = null, action) {
    const { payload = {}} = action;
    switch(action.type){
        case GET_CART_FETCHED:
            return {
                ...state,
                ...payload
            }
        default:
            return state;
    }
}

export default cartReducer;