/*
 *
 * PlpContainer reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION } from './constants';
import * as actionTypes from './constants';

export const initialState = {
  adBannerPos: 0,
  counter: 0,
  updateFilter: null,
};

function plpContainerReducer(state = initialState, action) {
  console.log('$$PLP Reducer State$$ ---- ', state, action.type);
  switch (action.type) {
    case actionTypes.INCREMENT:
      return {
        ...state,
        counter: state.counter + 1
      }
      case actionTypes.FILTER:
      console.log('Filter Reducers',action.val);
      return {
        ...state,
        updateFilter: action.val
      }
      case actionTypes.ADBANNERCOUNT:
      return {
        ...state,
        updateFilter: action.val + 12
      }
    default:
      return state;
  }
}

export default plpContainerReducer;
