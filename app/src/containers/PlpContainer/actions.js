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

export const increment = () => ({
    type: actionTypes.INCREMENT,
});

export const filter = (newUpdatedFilter, newFacetName, isRWDUpate) => ({
    type: actionTypes.FILTER,
    updatedFilter: newUpdatedFilter,
    facetName: newFacetName,
    isRWDUpate: isRWDUpate,
});

export const RWDFilter = (updatedFilter, facetName, isApply) => ({
    type: actionTypes.RWDFILTER,
    RWDupdatedFilter: updatedFilter,
    RWDfacetName: facetName,
    RWDisApply: isApply
});

export const browserFilter = (browserFilterData) => ({
    type: actionTypes.BROWSERFILTER,
    browserFilter: browserFilterData,
});

export const clearAllRWDFilters = () => ({
  type: actionTypes.CLEARALLFILTER,
});

export const adBannerAction = (value, sIndex) =>
    // console.log('adBannerAction', actionTypes);
    ({
        type: actionTypes.ADBANNERCOUNT,
        val: value,
        showIndex: sIndex,
    });

export const adBannerDataAction = value => ({
    type: actionTypes.ADBANNERDATA,
    data: value,
});

export const sortingAction = value => ({
    type: actionTypes.SORTING,
    val: value,
});

export const resetPLPReduxState = value => ({
    type: actionTypes.RESETPLPREDUXSTATE,
});

export const updateInitialValues = coloumn => {
    let bannerPos;
    if (coloumn === 3) {
        bannerPos = 12;
    } else {
        bannerPos = 8;
    }

    return {
        type: actionTypes.INITIALUPDATE,
        coloumnValue: coloumn,
        bannerPosValue: bannerPos,
    };
};

export const AddProduct = product => ({
    type: actionTypes.ADDPRODUCT,
    payload: {
        product,
    },
});

export const RemoveProduct = id => ({
    type: actionTypes.REMOVEPRODUCT,
    payload: {
        id,
    },
});

export const RemoveAll = () => ({
    type: actionTypes.REMOVEALL,
});

export const updateSKU = obj => ({
    type: actionTypes.UPDATESKU,
    payload: {
        obj
    }
});