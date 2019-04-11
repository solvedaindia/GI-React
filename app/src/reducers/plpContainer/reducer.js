/*
 *
 * PlpContainer reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION } from '../../constants/plpContainer/constants';
import * as actionTypes from '../../constants/plpContainer/constants';

const initialState = {
  adBannerPos: 12,
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
      return {
        ...state,
        updateFilter: action.val
      }
      case actionTypes.ADBANNERCOUNT:
      return {
        ...state,
        adBannerPos: action.val + 12
      }
    default:
      return state;
  }
}

export default plpContainerReducer;
