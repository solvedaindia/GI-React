import { takeEvery, call, put } from 'redux-saga/effects';
import apiManager from '../../utils/apiManager';
import appCookie from '../../utils/cookie';
import {cartDetailAPI} from '../../../public/constants/constants';

import * as actionTypes from '../../constants/app/constants';

// Individual exports for testing

  // worker Saga: will be fired on USER_FETCH_REQUESTED actions
	
	function* getCart(action) {
		try {
			const response = yield call(apiManager.get, cartDetailAPI, { 'headers': { 'pincode': appCookie.get('pincode') } });
			yield put({type: actionTypes.GET_CART_FETCHED, payload: response.data.data});
		} catch (e) {
			yield put({type: "USER_FETCH_FAILED", message: e.message});
		}
	}

	/*
		Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
		Allows concurrent fetches of user.
	*/
	function* cartContainerSaga() {
		yield takeEvery(actionTypes.GET_CART_REQUESTED, getCart);
	}

  	export default cartContainerSaga;
  