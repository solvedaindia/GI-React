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

const initialState = {
  sortingValue: 0,
  adBannerPos: 12,
  staticAdBannerPos: 0,
  columnLayout: 3,
  adBannerCurrentIndex: 0,
  adBannerData: [],
  updateFilter: new Map(),
  compWidgetData: [],
  compCategories: [],
};

function plpContainerReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.INCREMENT:
      return {
        ...state,
        counter: state.counter + 1,
      };
    case actionTypes.FILTER:
      return {
        ...state,
        adBannerPos: initialState.adBannerPos,
        adBannerCurrentIndex: initialState.adBannerCurrentIndex,
        updateFilter: updateFilterMap(
          action.updatedFilter,
          action.facetName,
          state,
        ),
      };
    case actionTypes.BROWSERFILTER:
      return {
        ...state,
        updateFilter: action.browserFilter,
      };
    case actionTypes.ADBANNERCOUNT:
      return {
        ...state,
        adBannerPos: action.val + state.staticAdBannerPos,
        adBannerCurrentIndex: action.showIndex + 1,
      };
    case actionTypes.ADBANNERDATA:
      return {
        ...state,
        adBannerData: action.data,
      };
    case actionTypes.SORTING:
      return {
        ...state,
        sortingValue: fetchReleventSortingValue(action.val),
        adBannerPos: initialState.adBannerPos,
        adBannerCurrentIndex: initialState.adBannerCurrentIndex,
      };
    case actionTypes.RESETPLPREDUXSTATE:
      state = initialState;
      return {
        sortingValue: 0,
        adBannerPos: 12,
        staticAdBannerPos: 0,
        columnLayout: 3,
        adBannerCurrentIndex: 0,
        adBannerData: [],
        updateFilter: new Map(),
        compWidgetData: [],
        compCategories: [],
      };
    case actionTypes.INITIALUPDATE:
      return {
        ...state,
        staticAdBannerPos: action.bannerPosValue,
        adBannerPos: action.bannerPosValue,
        columnLayout: action.coloumnValue,
      };
    case actionTypes.ADDPRODUCT:
      console.log('frd', 'in add product reducer', state);
      return {
        ...state,
        compWidgetData: [...state.compWidgetData, action.payload.product],
      };
    case actionTypes.REMOVEPRODUCT:
      return {
        ...state,
        compWidgetData: checkCompareWidget(
          state.compWidgetData,
          action.payload.id,
        ),
      };
    case actionTypes.REMOVEALL:
      return {
        ...state,
        compWidgetData: [],
      };
    default:
      return state;
  }
}

export default plpContainerReducer;
