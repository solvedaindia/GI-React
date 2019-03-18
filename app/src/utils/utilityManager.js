
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
