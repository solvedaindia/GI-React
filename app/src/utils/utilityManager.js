import {
  wishlistDataCookie,
  wishlistIdCookie,
} from '../../public/constants/constants';

/**
 * Function to Fetch specific data from Cookie store
 * @param {*} cname
 */
export function getCookie(cname) {
  const name = `${cname}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}

/**
 * Function to get relevent state of the reducer
 * @param {*} state
 * @param {*} reducerName
 */
export function getReleventReduxState(state, reducerName) {
  let extractedState;
  state._root.entries.map(result => {
    if (result[0] === reducerName) {
      extractedState = result[1];
    }
  });
  return extractedState;
}

/**
 * Function to get relevent value of the Sorting
 * @param {*} value 
  0 - Recommended
  3 - Low to High
  4 - High to Low
  5 - New Arrival
 */
export function fetchReleventSortingValue(value) {
  console.log('ttttt', value);
  if (value === 'Price Low to High') {
    return 3;
  }
  if (value === 'Price High to Low') {
    return 4;
  }
  if (value === 'New Arrival') {
    return 5;
  }
  // Recommended
  return 0;
}

/**
 * Function to save the Filter map object
 * @param {*} updatedFilter
 * @param {*} facetName
 */
export function updateFilterMap(updatedFilter, facetName, currentFilter) {
  const filterMap = currentFilter.updateFilter;
  if (updatedFilter.length === 0) {
    filterMap.delete(facetName);
    return filterMap;
  }
  filterMap.set(facetName, updatedFilter);
  return filterMap;
}

/**
 * Function to resolve the Filter
 * @param {*} updatedFilter
 */
export function resolveTheFilter(updatedFilter) {
  let filterURL = '';
  for (const [key, value] of updatedFilter) {
    filterURL += 'facet=';
    value.map((option, i) => {
      filterURL += option.value;
      if (value.length !== i + 1) {
        filterURL += '+';
      }
    });
    filterURL += '&';
  }
  return filterURL;
}

/** -----------------------------------------------------------------------
 * Function to resolve the Filter
 * @param {*} wishlist_Data
 */
export function resolveTheWishlistData(wishlist_Data) {
  const wishlistId = wishlist_Data.wishlistItemArray[0].wishlistID;
  const wishlistArr = wishlist_Data.wishlistItemArray[0].wishlistItemList;

  const json_str = JSON.stringify(wishlistArr);
  document.cookie = `${wishlistDataCookie}=${json_str};path=/;expires=''`;
  document.cookie = `${wishlistIdCookie}=${wishlistId};path=/;expires=''`;
}

export function getOnlyWishlistUniqueIds() {
  const wishliArrStr = getCookie(wishlistDataCookie);
  console.log('dd -- ', wishliArrStr);
  // if (wishliArrStr === null) {
  //   return;
  // }
  const wishlistArr = JSON.parse(wishliArrStr);

  const wishlistUniqueIdArr = wishlistArr.map(item => item.uniqueID);
  return wishlistUniqueIdArr;
}

export function getCorrespondingGiftlistId(uniqueID) {
  const wishliArrStr = getCookie(wishlistDataCookie);
  const wishlistArr = JSON.parse(wishliArrStr);
  let giftlistId = '';
  wishlistArr.map(item => {
    if (item.uniqueID === uniqueID) {
      giftlistId = item.giftListItemID;
    }
  });
  return giftlistId;
}

/* ----------------------------------------------------------------------- */

export function trimTheSentence(title, charLimit) {
  const trimStr = `${title.substring(0, charLimit)}...`;
  return trimStr;
}

export function checkCompareWidget(compWidget, id) {
  const data = compWidget.find(prd => prd.id == id);
  if (data) {
    return compWidget.filter(prd => prd.id != id);
  }
  return compWidget;
}
