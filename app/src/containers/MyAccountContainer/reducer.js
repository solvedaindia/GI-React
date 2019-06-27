/*
 *
 * PlpContainer reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION } from './constants';
import * as actionTypes from './constants';
import {
  fetchReleventSortingValue,
  updateFilterMap,
  checkCompareWidget,
} from '../../utils/utilityManager';

const initialState = {};

function plpContainerReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.INCREMENT:
      return {
        ...state,
        counter: state.counter + 1,
      };
    default:
      return state;
  }
}

export default plpContainerReducer;
