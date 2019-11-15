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
    updateWidgetData,
    RWDUpdateFilterMap,
    isMobile,
} from '../../utils/utilityManager';

const initialState = {
    sortingValue: 0,
    adBannerPos: 12,
    staticAdBannerPos: 0,
    columnLayout: 3,
    adBannerCurrentIndex: 0,
    adBannerData: [],
    updateFilter: new Map(),
    rwdUpdatedFilter: new Map(),
    compWidgetData: [],
    compCategories: [],
    resetCurrentSelection: false,
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
                updateFilter: isMobile() ? state.rwdUpdatedFilter : updateFilterMap(
                    action.updatedFilter,
                    action.facetName,
                    state,
                ),
            };
        case actionTypes.RWDFILTER:
            return {
                ...state,
                rwdUpdatedFilter: RWDUpdateFilterMap(
                    action.RWDupdatedFilter,
                    action.RWDfacetName,
                    state,
                ),
                updateFilter: action.RWDisApply ? new Map(state.rwdUpdatedFilter) : state.updateFilter,
            };
        case actionTypes.BROWSERFILTER:
            return {
                ...state,
                updateFilter: action.browserFilter,
            };
        case actionTypes.CLEARALLFILTER:
            return {
                ...state,
                updateFilter: new Map(),
                rwdUpdatedFilter: new Map(),
                resetCurrentSelection: true,
            };
        case actionTypes.RESETCURRENTFILLTER:
            return {
                ...state,
                resetCurrentSelection: false,
            };
        case actionTypes.RWDFILTERCANCEL:
            return {
                ...state,
                rwdUpdatedFilter: new Map(state.updateFilter),
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
                adBannerPos: isMobile() ? 8 : 12,
                staticAdBannerPos: 0,
                columnLayout: 3,
                adBannerCurrentIndex: 0,
                adBannerData: [],
                updateFilter: new Map(),
                rwdUpdatedFilter: new Map(),
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
        case actionTypes.UPDATESKU:
            return {
                ...state,
                compWidgetData: updateWidgetData(state.compWidgetData, action.payload.obj)
            }
        default:
            return state;
    }
}

export default plpContainerReducer;