/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from 'immutable';

import {
  LOAD_REPOS_SUCCESS,
  LOAD_REPOS,
  LOAD_REPOS_ERROR,
  WISH_LIST_COUNT,
  UPDATE_MINICART,
  RESET_REMOVEWISHLISTFLAG,
  UPDATE_PROFILE,
  GET_CART_FETCHED
} from '../../constants/app/constants';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  currentUser: false,
  userData: {
    repositories: false,
  },
  wishlistCount: 0,
  minicartCount: 0,
  removeWishlistFlag: false,
  userName: null,
  // cart: null
  // logonId: null,
});

function appReducer(state = initialState, action) {
  console.log('in The Reducer ---', action.type, action.payload);
  switch (action.type) {
    case LOAD_REPOS:
      return state
        .set('loading', true)
        .set('error', false)
        .setIn(['userData', 'repositories'], false);
    case LOAD_REPOS_SUCCESS:
      return state
        .setIn(['userData', 'repositories'], action.repos)
        .set('loading', false)
        .set('currentUser', action.username);
    case LOAD_REPOS_ERROR:
      return state.set('error', action.error).set('loading', false);
    case WISH_LIST_COUNT:
      return state.set('loading', false).set('wishlistCount', action.count);
    case UPDATE_MINICART:
      return state.set('loading', false).set('minicartCount', action.count);
    case RESET_REMOVEWISHLISTFLAG:
      return state.set('loading', false).set('removeWishlistFlag', action.flag);
    case UPDATE_PROFILE:
      console.log('In The UPdate Profile  ####', action.userName);
      return state.set('loading', false).set('userName', action.userName);
    // .set('logonId', action.logonId);
    // case GET_CART_FETCHED:
    //   return state.set('cart', action.payload);
    default:
      return state;
  }
}

export default appReducer;
