/*
 *
 * ClpContainer reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION } from '../../constants/clpContainer/constants';

export const initialState = fromJS({});

function clpContainerReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default clpContainerReducer;
