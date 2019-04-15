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
  adBannerPos: 12,
  sortingValue: 0,
  counter: 0,
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
        adBannerPos: action.val + 12
      }
      case actionTypes.SORTING:
      return {
        ...state,
        sortingValue: fetchReleventSortingValue(action.val),
        adBannerPos: initialState.adBannerPos
      }
    default:
      return state;
  }
}

export default plpContainerReducer;



