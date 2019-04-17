/*
 *
 * PlpContainer reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION } from './constants';
import * as actionTypes from './constants';
import {fetchReleventSortingValue} from '../../utils/utilityManager'

const initialState = {
  sortingValue: 0,
  adBannerPos: 12,
  adBannerCurrentIndex: 0,
  adBannerData:[],
  updateFilter: null,
};

function plpContainerReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.INCREMENT:
      return {
        ...state,
        counter: state.counter + 1
      }
      case actionTypes.FILTER:
      return {
        ...state,
        updateFilter: action.val
      }
      case actionTypes.ADBANNERCOUNT:
      return {
        ...state,
        adBannerPos: action.val + 12,
        adBannerCurrentIndex: action.showIndex+1
      }
      case actionTypes.ADBANNERDATA:
      return {
        ...state,
        adBannerData: action.data
      }
      case actionTypes.SORTING:
      return {
        ...state,
        sortingValue: fetchReleventSortingValue(action.val),
        adBannerPos: initialState.adBannerPos,
        adBannerCurrentIndex: initialState.adBannerCurrentIndex
      }
    default:
      return state;
  }
}

export default plpContainerReducer;



