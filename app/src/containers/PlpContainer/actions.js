/*
 *
 * PlpContainer actions
 *
 */

import { DEFAULT_ACTION } from './constants';
import * as actionTypes from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export const increment = () => {
  return {
    type: actionTypes.INCREMENT
  }
}

export const filter = (value) => {
  return {
    type: actionTypes.FILTER,
    val: value
  }
}

export const adBannerAction = (value) => {
  return {
    type: actionTypes.ADBANNERCOUNT,
    val: value
  }
}

export const sortingAction = (value) => {
  return {
    type: actionTypes.SORTING,
    val: value
  }
}