

/**
 * Function to Fetch specific data from Cookie store
 * @param {*} cname 
 */
export function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
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
  }
  )
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
  console.log('ttttt', value)
  if (value === 'Price Low to High') {
    return 3;
  }
  else if (value === 'Price High to Low') {
    return 4;
  }
  else if (value === 'New Arrival') {
    return 5;
  }
  else { // Recommended
    return 0;
  }
}

/**
 * Function to save the Filter map object
 * @param {*} updatedFilter
 * @param {*} facetName 
 */
export function updateFilterMap(updatedFilter, facetName, currentFilter) {
  var filterMap = currentFilter.updateFilter;
  if (updatedFilter.length === 0) {
    filterMap.delete(facetName);
    return filterMap;
  }
  filterMap.set(facetName, updatedFilter)
  return filterMap;
}

/**
 * Function to resolve the Filter
 * @param {*} updatedFilter
 */
export function resolveTheFilter(updatedFilter) {
  console.log('Utility ResovleTheFilter ---- ',updatedFilter);
  var filterURL='';
  for (const [key, value] of updatedFilter) {
    filterURL += 'facet=';
    value.map((option, i) => {
      filterURL += option.value
      if (value.length !== i+1) {
         filterURL += '+'
      }
      
    })
    filterURL += '&'
}
  console.log('FilterURL---- ', filterURL);
  return filterURL;
}
